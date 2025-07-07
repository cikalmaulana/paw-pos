import { I_LoginData } from "@/services/api/api.login.int";
import { I_Store } from "@/services/api/api.store.int";
import { I_User } from "@/services/api/api.user.get.int";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import AccountMain from "./_element/account.main";

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN"

export default function AccountPage() {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<I_User | null>(null)
    const [storeData, setStoreData] = useState<I_Store | null>(null)
    const [balance, setBalance] = useState('')

    useEffect(() => {
        const starterData = async () => {
            setLoading(true)
            const stored = await AsyncStorage.getItem(KEY_LOGIN)

            if (stored) {
                try {
                    const datas: I_LoginData = JSON.parse(stored)
                    setUserData(datas.user)
                    setStoreData(datas.store)

                } catch (error) {
                    console.error("Failed to parse login data", error)
                    return
                }
            }

            setLoading(false)
        }

        starterData()
    }, [])

    return (
        <View className="mt-24">
            {
                loading ? (
                    <ActivityIndicator size="large" color="#16B8A8" />
                ) : (!storeData || !userData) ? (
                    <View> 
                        <Text>Please ReOpen Application</Text>
                    </View>
                ) : (
                    <AccountMain 
                        userData={userData} 
                        storeData={storeData}
                    />
                )
            }
        </View>
    );
}
