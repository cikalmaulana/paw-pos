import { API_Register } from "@/services/api/auth/api.register";
import { I_RegisterRequest, I_RegisterResponse } from "@/services/api/auth/api.register.int";

export const doRegister = async (params: I_RegisterRequest): Promise<I_RegisterResponse> => {
    try{
        const result = await API_Register(params)
        if(result) return result 
        return {
            meta: {
                status: "failed",
                code: 404,
                message: "Failed to connect with server"
            }
        }
    } catch(error){
        return {
            meta: {
                status: "failed",
                code: 404,
                message: "Failed to connect with server"
            }
        }
    }
}