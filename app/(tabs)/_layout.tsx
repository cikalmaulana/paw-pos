import HistoryActiveIcon from "@/assets/icons/history-active.png"
import HistoryIcon from "@/assets/icons/history.png"
import HomeActiveIcon from "@/assets/icons/home-active.png"
import HomeIcon from "@/assets/icons/home.png"
import OrderActiveIcon from "@/assets/icons/order-active.png"
import OrderIcon from "@/assets/icons/order.png"
import UserActiveIcon from "@/assets/icons/user-active.png"
import UserIcon from "@/assets/icons/user.png"
import { isSessionExpired } from "@/services/function/sessionChecker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Tabs, useRouter } from "expo-router"
import React, { useEffect, useState } from 'react'

import { I_Store } from "@/services/api/store/api.store.int"
import { Image } from "react-native"
import { TAB_HEIGHT } from "./constant"


const _Layout = () => {
    const [needOngoingOrder, setNeedOngoingOrder] = useState(true)
    const [checking, setChecking] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const router = useRouter()
    const KEY_LOGIN = process.env.KEY_LOGIN

    useEffect(() => {
        const checkLogin = async () => {
            const stored = await AsyncStorage.getItem(KEY_LOGIN ?? "KEY_LOGIN")

            if (!stored) {
                router.replace("../welcome" as const)
                return
            }

            try {
                const parsed = JSON.parse(stored) as {
                    store: I_Store
                    token: string
                    expiredAt?: number
                }

                if (isSessionExpired(parsed.expiredAt)) {
                    await AsyncStorage.removeItem(KEY_LOGIN ?? "KEY_LOGIN")
                    router.replace("../welcome" as const)
                    return
                }

                if(!parsed.store.setting.need_ongoing_order) setNeedOngoingOrder(false)

                setLoggedIn(true)
            } catch {
                await AsyncStorage.removeItem(KEY_LOGIN ?? "KEY_LOGIN")
                router.replace("../welcome" as const)
            } finally {
                setChecking(false)
            }
        }
        checkLogin()
    }, [])

    if (checking || !loggedIn) return null

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#16B8A8",
                tabBarInactiveTintColor: "#B2C6D5",
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopColor: '#B2C6D5',
                    height: TAB_HEIGHT,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "700",
                    marginBottom: 4,
                },
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? HomeActiveIcon : HomeIcon}
                            style={{ width: 22, height: 22 }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />

            {needOngoingOrder && (
                <Tabs.Screen 
                    name="order"
                    options={{
                        title: "Order",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={focused ? OrderActiveIcon : OrderIcon}
                                style={{ width: 24, height: 24 }}
                                resizeMode="contain"
                            />
                        ),
                    }}
                />
            )}

            <Tabs.Screen 
                name="history"
                options={{
                    title: "History",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? HistoryActiveIcon : HistoryIcon}
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />

            <Tabs.Screen 
                name="account"
                options={{
                    title: "Account",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? UserActiveIcon : UserIcon}
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                    ),
                }}
            />

        </Tabs>
    )
}

export default _Layout