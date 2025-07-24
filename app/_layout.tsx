import { LangProvider } from "@/services/function/LangContext"
import { Stack } from "expo-router"
import './global.css'

export default function RootLayout() {
    return (
        <LangProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </LangProvider>
    )
}
