import { API_Register } from "@/services/api/auth/api.register";
import { I_RegisterRequest, I_RegisterResponse } from "@/services/api/auth/api.register.int";

export const doRegister = async (params: I_RegisterRequest): Promise<I_RegisterResponse> => {
    console.log("DO REGISTER PARAM: ", params)
    try {
        const result = await API_Register(params);
        console.log("DO REGISTER RESULT: ", result)
        return result;
    } catch (error: any) {
        console.log("DO REGISTER ERROR:", error);
        return {
            meta: {
                status: "failed",
                code: 500,
                message: error?.message || "Failed to connect with server"
            }
        };
    }
};
