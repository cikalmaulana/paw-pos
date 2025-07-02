import { API_Login } from "@/services/api/api.login";
import { I_LoginData, I_LoginRequest, I_LoginResponse } from "@/services/api/api.login.int";
import { API_GetStoreByOwner } from "@/services/api/api.store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN";

export const doLogin = async (params: I_LoginRequest, remember: boolean): Promise<I_LoginResponse> => {
    try {
        const result = await API_Login(params)
        if(result) {
            if(result.meta.status === "success" && result.user) {
                const store = await API_GetStoreByOwner(result.user.id)
                if(store.meta.status === "success"){
                    const loginData: I_LoginData & { expiredAt: number } = {
                        token: "ThIsIstOKEnForvserLogin",
                        user: result.user,
                        store: store.data,
                        expiredAt: Date.now() + (remember ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000) 
                    }
            
                    await AsyncStorage.setItem(KEY_LOGIN, JSON.stringify(loginData));
            
                    return result
                }
                return {
                    meta: store.meta,
                    user: null
                }
            }
            return {
                meta: result.meta,
                user: null
            }
        }
        return {
            meta: {
                status: "failed",
                code: 404,
                message: "Failed to connect with server."
            },
            user: null
        }; 
    } catch (error) {
        return {
            meta: {
                status: "failed",
                code: 404,
                message: "Failed to connect with server."
            },
            user: null
        }; 
    }
};
