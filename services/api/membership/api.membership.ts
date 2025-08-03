import { I_GetAllMembershipData, I_GetMembershipResponse, I_GetOwnerOTPResponse, I_MembershipData, I_SetMembershipRequest, I_SetMembershipResponse } from "./api.membership.int";

export async function API_GetAllMembershipData(): Promise<I_GetAllMembershipData> {
    const uri = "http://192.168.1.5:3000/graphql";
    const response = await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query {
                    getAllMembership {
                        meta {
                            status
                            code
                            message
                        }
                        data {
                            _id
                            name
                            code
                            price
                            duration_in_days
                            benefit
                        }
                    }
                }
            `,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    return json.data.getAllMembership;
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
                query GetMembershipById($id: String!) {
                    getMembershipById(id: $id) {
                        meta {
                            status
                            code
                            message
                        }
                        data {
                            _id
                            name
                            code
                            price
                            duration_in_days
                            benefit
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

export async function API_GetMembershipById(id: string): Promise<I_GetMembershipResponse | null>{
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Get Memebrship Success"
        },
        data: {
            is_member: true,
            member_type: "basic",
            date_joined: "2025-07-07T01:13:46.123Z",
            date_expired: "2025-08-07T01:13:46.123Z",
        }
    }
} 

export async function API_SetMembership(payload: I_SetMembershipRequest): Promise<I_SetMembershipResponse>{
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Set Memebrship Success"
        },
        data: {
            is_member: true,
            member_type: "basic",
            date_joined: "2025-07-07T01:13:46.123Z",
            date_expired: "2025-08-07T01:13:46.123Z",
        }
    }
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
            otp: "123456",
            expired: "2025-07-08T01:13:46.123Z"
        }
    }
}