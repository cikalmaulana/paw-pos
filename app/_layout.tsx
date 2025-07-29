import { CE_Alert } from "@/components/Alert";
import CE_ModalConfirmation from "@/components/ModalConfirmation";
import { LangProvider } from "@/services/function/LangContext";
import { Stack } from "expo-router";
import { ALERT_NAME, MODAL_NAME } from "./constant/constant";
import './global.css';

export default function RootLayout() {
    return (
        <LangProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <CE_Alert name={ALERT_NAME} />
            <CE_ModalConfirmation eventName={MODAL_NAME} />
        </LangProvider>
    );
}