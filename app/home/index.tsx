
import { I_LoginData } from "@/services/api/auth/api.login.int";
import { I_Category } from "@/services/api/category/api.category.get.int";
import { I_GetMenuResponse } from "@/services/api/item/api.item.get.int";
import { I_Lang } from "@/services/api/other/api.language.int";
import { I_Store } from "@/services/api/store/api.store.int";
import { I_User } from "@/services/api/user/api.user.get.int";
import { useLocale } from "@/services/function/useLocale";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import HomeMain from "./_element/home.main";
import { doGetCategory } from "./_function/do.getCategory";
import { doGetItems } from "./_function/do.getItems";
import { locales } from "./locales";

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN"

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [storeData, setStoreData] = useState<I_Store | null>(null)
    const [userData, setUserData] = useState<I_User | null>(null)
    const [categoryData, setCategoryData] = useState<I_Category[] | null>(null)
    const [itemData, setItemData] = useState<I_GetMenuResponse | null>(null)
    const [lang, setLang] = useState<I_Lang>({name: "ID"})
    const language = useLocale(lang, locales)

    useFocusEffect(
        useCallback(() => {
            const starterData = async () => {
                setLoading(true)
                
                const stored = await AsyncStorage.getItem(KEY_LOGIN)
                const categoriesResponse = await doGetCategory()

                if (stored) {
                    try {
                        const datas: I_LoginData = JSON.parse(stored)
                        setStoreData(datas.store)
                        setUserData(datas.user)
                        setLang(datas.lang)

                        if (categoriesResponse?.data) {
                            setCategoryData(categoriesResponse.data)
                        }
                    } catch (error) {
                        console.error("Failed to parse login data", error)
                    }
                }

                const items = await doGetItems()
                if (items) setItemData(items)

                setLoading(false)
            }

            starterData()
        }, [])
    )

    return (
        <View className="mt-24">
            {
                loading ? (
                    <ActivityIndicator size="large" color="#16B8A8" />
                ) : (!storeData || !userData) ? (
                    <View> 
                        <Text>{language.error}</Text>
                    </View>
                ) : (
                    <HomeMain 
                        lang={lang}
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
