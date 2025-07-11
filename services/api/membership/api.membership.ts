import { I_GetMembershipResponse, I_GetOwnerOTPResponse, I_SetMembershipRequest, I_SetMembershipResponse } from "./api.membership.int";

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