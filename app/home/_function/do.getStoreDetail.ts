import { I_LoginData } from '@/services/api/api.login.int'
import { I_Store } from '@/services/api/api.store.int'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN"

export const doGetStoreDetail = async (): Promise<I_Store | null> => {
    try {
        const storedData = await AsyncStorage.getItem(KEY_LOGIN)

        if (!storedData) return null

        const loginData: I_LoginData = JSON.parse(storedData)

        return loginData.store
    } catch (error) {
        console.error("Failed to get login data:", error)
        return null
    }
}
