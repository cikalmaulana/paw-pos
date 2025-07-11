import { I_RegisterRequest, I_RegisterResponse } from "./api.register.int";

export async function API_Register(params: I_RegisterRequest): Promise<I_RegisterResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Register Success"
        }
    };
}
