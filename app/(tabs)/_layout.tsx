import AsyncStorage from "@react-native-async-storage/async-storage"
import { Tabs, useRouter } from "expo-router"
import React, { useEffect, useState } from 'react'

const _Layout = () => {
    const [checking, setChecking] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const router = useRouter()
    const KEY_LOGIN = process.env.KEY_LOGIN

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem(KEY_LOGIN ?? "KEY_LOGIN")
            if (!token) {
                router.replace("../welcome" as const)
                return
            }
            setLoggedIn(true)
            setChecking(false)
        }

        checkLogin()
    }, [])

    if (checking || !loggedIn) return null


    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                tabBarStyle: {
                    backgroundColor: '#0F0D23',
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#0F0D23'
                }
            }}
        >
            <Tabs.Screen 
                name='index'
                options={{
                    title: 'Home',
                    headerShown:false,
                }}
            />
            <Tabs.Screen 
                name='search'
                options={{
                    headerShown:false,
                    title: 'Search',
                }}
            />
            <Tabs.Screen 
                name='saved'
                options={{
                    headerShown:false,
                    title: 'Saved',
                }}
            />
            <Tabs.Screen 
                name='profile'
                options={{
                    headerShown:false,
                    title: 'Profile',
                }}
            />
        </Tabs>
    )
}

export default _Layout