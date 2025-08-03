import { I_LoginRequest, I_LoginResponse } from "./api.login.int";

export async function API_Login(params: I_LoginRequest): Promise<I_LoginResponse> {
    console.log("API_Login PARAM: ", params)
    const uri = "http://192.168.1.5:3000/graphql";

    const response = await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                mutation Login($input: LoginUserInput!) {
                    login(input: $input) {
                        meta {
                            status
                            code
                            message
                        }
                        data {
                            id
                            name
                            phone
                            address
                            age
                            user_type
                            membership {
                                is_member
                                member_type
                                date_joined
                                date_expired
                            }
                        }
                    }
                }
            `,
            variables: {
                input: params,
            },
        }),
    });
    console.log("API_Login RESPONSE: ", response)

    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
    }

    const json = await response.json();

    console.log("API_Login RESPONSE JSON: ", json)

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    const { meta, data } = json.data.login;

    return {
        meta,
        user: data ?? null,
    };
}

