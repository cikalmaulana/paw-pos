import { I_ChangePasswordRequest, I_ChangePasswordResponse, I_EditUserRequest, I_EditUserResponse, I_GetUserRequest, I_GetUserResponse } from "./api.user.get.int";

export async function API_GetUser(params: I_GetUserRequest): Promise<I_GetUserResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Get User Success"
        },
        data: {
            id: "1",
            name: "John Doe",
            phone: "081234567890",
            user_type: "owner",
            membership: {
                is_member: true,
                member_type: "basic",
                date_joined: "2025-07-07T01:13:46.123Z",
                date_expired: "2025-08-07T01:13:46.123Z",
            }
        }
    }
}

export async function API_EditUser(params:I_EditUserRequest): Promise<I_EditUserResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Edit Success"
        },
        data: {
            id: "1",
            name: "John Doe",
            phone: "081234567890",
            user_type: "owner",
            membership: {
                is_member: true,
                member_type: "basic",
                date_joined: "2025-07-07T01:13:46.123Z",
                date_expired: "2025-08-07T01:13:46.123Z",
            }
        }
    }
}

export async function API_ChangePassword(payload: I_ChangePasswordRequest): Promise<I_ChangePasswordResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Change Password Success"
        }
    }
}