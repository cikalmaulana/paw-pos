import AsyncStorage from "@react-native-async-storage/async-storage";
import { I_LoginData } from "../api/auth/api.login.int";
import { API_GetUser } from "../api/user/api.user.get";
import { I_User } from "../api/user/api.user.get.int";

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN"

export const updateUserData = async (): Promise<I_User | null> => {
    const stored = await AsyncStorage.getItem(KEY_LOGIN)
    if(stored) {
        const datas: I_LoginData = JSON.parse(stored)
        const result = await API_GetUser({user_id: datas.user.id})
        if(result) {
            const loginData: I_LoginData = {
                token: "ThIsIstOKEnForvserLogin",
                user: result.data,
                store: datas.store,
                expiredAt: Date.now() + (datas.expiredAt ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000) 
            }
        
            await AsyncStorage.setItem(KEY_LOGIN, JSON.stringify(loginData));
            return result.data
        } else return null
    } else return null
}