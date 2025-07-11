import { I_LoginRequest, I_LoginResponse } from "./api.login.int";

export async function API_Login(params: I_LoginRequest): Promise<I_LoginResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Login Success"
        },
        user: {
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
    };
}
