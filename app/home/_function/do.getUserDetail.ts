import { I_LoginData } from '@/services/api/auth/api.login.int'
import { I_User } from '@/services/api/user/api.user.get.int'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN"

export const doGetUserDetail = async (): Promise<I_User | null> => {
    try {
        const storedData = await AsyncStorage.getItem(KEY_LOGIN)

        if (!storedData) return null

        const loginData: I_LoginData = JSON.parse(storedData)

        return loginData.user
    } catch (error) {
        console.error("Failed to get login data:", error)
        return null
    }
}
