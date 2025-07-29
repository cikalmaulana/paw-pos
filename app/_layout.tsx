import CE_ModalConfirmation from "@/components/ModalConfirmation";
import { LangProvider } from "@/services/function/LangContext";
import { Stack } from "expo-router";
import { MODAL_NAME } from "./constant/constant";
import './global.css';

export default function RootLayout() {
    return (
        <LangProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <CE_ModalConfirmation eventName={MODAL_NAME} />
        </LangProvider>
    );
}