import { I_GetMenuResponse } from "@/services/api/api.item.get.int";
import { I_LoginData } from "@/services/api/api.login.int";
import { I_Store } from "@/services/api/api.store.int";
import { I_User } from "@/services/api/api.user.get.int";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { HomeMain } from "./_element/home.main";
import { doGetItems } from "./_function/do.getItems";

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN"

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [storeData, setStoreData] = useState<I_Store | null>(null)
    const [userData, setUserData] = useState<I_User | null>(null)
    const [itemData, setItemData] = useState<I_GetMenuResponse | null>(null)
    const router = useRouter();

    useEffect(() => {
        const starterData = async () => {
            const stored = await AsyncStorage.getItem(KEY_LOGIN)

            if (stored) {
                try {
                    const datas: I_LoginData = JSON.parse(stored)
                    setStoreData(datas.store)
                    setUserData(datas.user)
                } catch (error) {
                    console.error("Failed to parse login data", error)
                    return
                }
            }

            const items = await doGetItems()
            if(items) setItemData(items)

        }

        starterData()
    }, [])

    return (
        <View className="mt-24">
            {(!storeData || !userData) ? (
                <View> 
                    <Text>Please ReOpen Application</Text>
                </View>
            ) : (
                <HomeMain 
                    userData={userData}
                    storeData={storeData}
                    itemData={itemData}
                />
            )}
        </View>
    );
}
