import AsyncStorage from "@react-native-async-storage/async-storage";
import { I_LoginData } from "../api/auth/api.login.int";
import { API_GetStoreById } from "../api/store/api.store.get";
import { I_Store } from "../api/store/api.store.int";

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN"

export const updateStoreData = async (): Promise<I_Store | null> => {
    const stored = await AsyncStorage.getItem(KEY_LOGIN)
    if(stored) {
        const datas: I_LoginData = JSON.parse(stored)
        const result = await API_GetStoreById(datas.store.id)
        if(result) {
            const loginData: I_LoginData = {
                token: "ThIsIstOKEnForvserLogin",
                user: datas.user,
                store: result.data,
                expiredAt: Date.now() + (datas.expiredAt ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000) 
            }
        
            await AsyncStorage.setItem(KEY_LOGIN, JSON.stringify(loginData));
            return result.data
        } else return null
    } else return null
}