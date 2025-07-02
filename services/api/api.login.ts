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
            phone: "081234567890"
        }
    };
}
