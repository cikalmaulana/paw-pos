import { I_GetUserRequest, I_GetUserResponse } from "./api.user.get.int";

export async function API_GetUser(params: I_GetUserRequest): Promise<I_GetUserResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Register Success"
        },
        data: {
            id: "1",
            name: "John Doe",
            phone: "081234567890"
        }
    }
}