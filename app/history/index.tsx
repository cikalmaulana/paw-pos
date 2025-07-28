import { FailedGetData } from "@/components/FailedGetData";
import { I_LoginData } from "@/services/api/auth/api.login.int";
import { I_Order } from "@/services/api/order/api.order.int";
import { I_Store } from "@/services/api/store/api.store.int";
import { I_User } from "@/services/api/user/api.user.get.int";
import { useLang } from "@/services/function/LangContext";
import { useLocale } from "@/services/function/useLocale";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from "react";
import { ActivityIndicator, Dimensions, RefreshControl, ScrollView, Text, View } from "react-native";
import HistoryMain from "./_element/history.main";
import { doGetOrderList } from "./_function/do.getOrderList";
import { locales } from "./locales";

const KEY_LOGIN = process.env.KEY_LOGIN ?? "KEY_LOGIN"

export default function HistoryPage() {
    const [loading, setLoading] = useState(false)
    const [storeData, setStoreData] = useState<I_Store | null>(null)
    const [userData, setUserData] = useState<I_User | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    const [orderData, setOrderData] = useState<I_Order[]>([])
    const [storeId, setStorId] = useState('')
    const [fetchFailed, setFetchFailed] = useState(false)
    const { lang, setLang } = useLang()
    const language = useLocale(lang, locales)

    const doRefresh = () => {
        setRefreshing(true)
        starterData().finally(() => setRefreshing(false))
    }

    useFocusEffect(
        useCallback(() => {
        starterData()
        }, [])
    )

    const starterData = async () => {
        setLoading(true)
        const stored = await AsyncStorage.getItem(KEY_LOGIN)

        if (stored) {
            try {
                const datas: I_LoginData = JSON.parse(stored)
                const orderList = await doGetOrderList(datas.store.id)
                if (orderList && orderList.data) {
                    setStorId(datas.store.id)
                    setOrderData(orderList.data)
                    setStoreData(datas.store)
                    setUserData(datas.user)
                    setLang(datas.lang)
                    setFetchFailed(false)
                } else {
                    setFetchFailed(true)
                }
            } catch (error) {
                console.error("Failed to parse login data", error)
                setFetchFailed(true)
            }
        }

        setLoading(false)
    }

    const shouldShowFailed = fetchFailed || storeId === '' || !storeData || !userData
    const screenHeight = Dimensions.get("window").height

    return (
        <View className="flex-1 mt-24">
            <View className="flex flex-row justify-between items-center mb-3 mx-5">
                <View className="flex flex-row gap-2 items-center">
                    <Text className="text-primary font-bold text-2xl">
                        {language.title}
                    </Text>
                </View>
            </View>
            {
                loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#16B8A8" />
                    </View>
                ) : (
                    <ScrollView
                        contentContainerStyle={{ flex: 1, paddingBottom: 1000}}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={doRefresh}
                                colors={["#16B8A8"]}
                                tintColor="#16B8A8"
                                title="Loading..."
                                titleColor="#16B8A8"
                            />
                        }
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            shouldShowFailed ? (
                                <FailedGetData />
                            ) : (
                                <HistoryMain
                                    language={language}
                                    orderData={orderData}
                                    userData={userData}
                                    storeData={storeData}
                                />
                            )
                        }
                    </ScrollView>
                )
            }
        </View>
    )
}
