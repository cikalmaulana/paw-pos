import AsyncStorage from "@react-native-async-storage/async-storage"
import { Stack, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'

const _layout = () => {
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

    return <Stack screenOptions={{ headerShown: false, gestureEnabled: false, }} />
}

export default _layout