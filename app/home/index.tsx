import { I_Category } from "@/services/api/api.category.int";
import { I_GetMenuResponse } from "@/services/api/api.item.get.int";
import { I_LoginData } from "@/services/api/api.login.int";
import { I_Store } from "@/services/api/api.store.int";
import { I_User } from "@/services/api/api.user.get.int";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import HomeMain from "./_element/home.main";
import { doGetCategory } from "./_function/do.getCategory";
import { doGetItems } from "./_function/do.getItems";

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN"

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [storeData, setStoreData] = useState<I_Store | null>(null)
    const [userData, setUserData] = useState<I_User | null>(null)
    const [categoryData, setCategoryData] = useState<I_Category[] | null>(null)
    const [itemData, setItemData] = useState<I_GetMenuResponse | null>(null)

    useEffect(() => {
        const starterData = async () => {
            setLoading(true)
            const stored = await AsyncStorage.getItem(KEY_LOGIN)
            const categoriesResponse = await doGetCategory()

            if (stored) {
                try {
                    const datas: I_LoginData = JSON.parse(stored)
                    setStoreData(datas.store)
                    setUserData(datas.user)

                    if (categoriesResponse?.data) {
                        setCategoryData(categoriesResponse.data)
                    }
                } catch (error) {
                    console.error("Failed to parse login data", error)
                    return
                }
            }

            const items = await doGetItems()
            if(items) setItemData(items)
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
                    <HomeMain 
                        userData={userData}
                        storeData={storeData}
                        itemData={itemData}
                        categoryData={categoryData}
                    />
                )
            }
        </View>
    );
}
