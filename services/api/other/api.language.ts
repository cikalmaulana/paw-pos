import AsyncStorage from '@react-native-async-storage/async-storage'
import { I_LoginData } from '../auth/api.login.int'
import { I_Lang } from './api.language.int'

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN"

export const API_GetLanguage = async (): Promise<I_Lang | null> => {
    try {
        const storedData = await AsyncStorage.getItem(KEY_LOGIN)

        if (!storedData) return null

        const loginData: I_LoginData = JSON.parse(storedData)

        return loginData.lang
    } catch (error) {
        console.error("Failed to get login data:", error)
        return null
    }
}

export const API_UpdateLanguage = async (lang: I_Lang): Promise<boolean> => {
    try {
        const storedData = await AsyncStorage.getItem(KEY_LOGIN)

        if (!storedData) return false

        const datas: I_LoginData = JSON.parse(storedData)

        const loginData: I_LoginData = {
            token: datas.token,
            user: datas.user,
            store: datas.store,
            expiredAt: datas.expiredAt,
            lang: lang
        }

        console.log("API_UpdateLanguage LOGIN DATA: ", loginData)

        await AsyncStorage.setItem(KEY_LOGIN, JSON.stringify(loginData));

        return true
    } catch (error) {
        console.error("Failed to get login data:", error)
        return false
    }
}