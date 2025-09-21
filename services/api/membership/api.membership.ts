import { I_GetAllMembershipData, I_GetOwnerOTPResponse, I_MembershipData, I_SetMembershipRequest, I_SetMembershipResponse } from "./api.membership.int";


export async function API_GetAllMembershipData(): Promise<I_GetAllMembershipData> {
    const uri = "http://192.168.1.4:3000/graphql";
    console.log("API_GetAllMembershipData URI: ", uri)
    
    const response = await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query {
                    memberships {
                        meta {
                            status
                            message
                            code
                        }
                        data {
                            _id
                            name
                            code
                            benefit
                            duration_in_days
                        }
                    }
                }
            `,
        }),
    });

    console.log("API_GetAllMembershipData RESPONSE: ", response)
    
    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
    }
    
    const json = await response.json();
    
    if (json.errors) {
        throw new Error(json.errors[0].message);
    }
    console.log("API_GetAllMembershipData RESPONSE JSON: ", json.data.memberships.data)

    return json.data.memberships
}

export async function API_GetMembershipDataById(membership_id: string): Promise<I_MembershipData> {
    const uri = "http://192.168.1.5:3000/graphql";
    const response = await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query($input: GetMembershipDataByIdInput!) {
                    membership(input: $input) {
                        meta {
                            status
                            message
                            code
                        }
                        data {
                            _id
                            name
                            code
                            benefit
                            duration_in_days
                        }
                    }
                }
            `,
            variables: {
                id: membership_id
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

    return json.data.getMembershipById;
}

export async function API_SetMembership(
    payload: I_SetMembershipRequest
): Promise<I_SetMembershipResponse> {
    const uri = "http://192.168.1.4:3000/graphql"
    const response = await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                mutation ($input: RegisterMembershipInput!) {
                    registerMembership(input: $input) {
                        meta {
                            status
                            code
                            message
                        }
                        data {
                            _id
                            name
                            age
                            address
                            phone
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
                input: {
                    user_id: payload.user_id,
                    membership_id: payload.membership_id
                }
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

    return json.data.registerMembership;
}


export async function API_GetOwnerOtp(owner_phone: string): Promise<I_GetOwnerOTPResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Set Memebrship Success"
        },
        data: {
            store_id: '1',
            otp: "1234",
            expired: "2025-12-12T01:13:46.123Z"
        }
    }
}