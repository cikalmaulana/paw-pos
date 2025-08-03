import { I_RegisterRequest, I_RegisterResponse } from "./api.register.int";

export async function API_Register(params: I_RegisterRequest): Promise<I_RegisterResponse> {
    const uri = "http://192.168.1.5:3000/graphql"
    const response = await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                mutation Register($input: CreateUserInput!) {
                    register(input: $input) {
                        meta {
                        status
                        code
                        message
                        }
                    }
                }
            `,
            variables: {
                input: {
                    ...params,
                    age: 25,
                    address: "Bandung"
                },
            },
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    return json.data.register;
}
