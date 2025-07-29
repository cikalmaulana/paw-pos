import { CE_Alert } from "@/components/Alert";
import { CE_Button } from "@/components/Button";
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { globalEmitter } from "@/services/function/globalEmitter";
import { useLang } from "@/services/function/LangContext";
import { useLocale } from "@/services/function/useLocale";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler, Dimensions, View } from "react-native";
import ModalChangeLanguage from "../login/_element/login.change.lang";
import { locales } from "./locales";

const ALERT_NAME = 'alert-welcome'

export default function Welcome() {
    const { lang, setLang } = useLang()
    const language = useLocale(lang, locales)
    const screenHeight = Dimensions.get("window").height
    const router = useRouter()
    const goToLogin = () => { router.navigate("/login") }
    const goToRegister = () => { router.navigate("/register") };
    const { isSuccess, message } = useLocalSearchParams();
    const [modalLangOpen, setModalLangOpen] = useState(false)

    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if (message) {
            const timeout = setTimeout(() => {
                router.setParams({});
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [message]);

    const setupAlert = (msg: string, isSuccess: boolean) => {
        globalEmitter.emit(ALERT_NAME, {
            message: msg,
            isSuccess: isSuccess,
        });
    }

    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    top: screenHeight * -0.1,
                    left: 0,
                    right: 0,
                    zIndex: 999,
                }}
            >
                <CE_Alert name={ALERT_NAME} />
            </View>
            <LoginRegisterLayout 
                title={language.title}
                modalOpen={modalLangOpen}
                openModalChangeLang={(open) => setModalLangOpen(open)}
            >
                <CE_Button title={language.button.signin} onPress={() => goToLogin()} className="mt-20 mb-4"/>
                <CE_Button title={language.button.register} onPress={() => goToRegister()} bgColor="bg-secondary"/>
            </LoginRegisterLayout>

            {modalLangOpen && (
                <ModalChangeLanguage 
                    isOpen={modalLangOpen}
                    setIsModalOpen={(open) => setModalLangOpen(open)}
                    setUpAlert={(msg: string, isSuccess: boolean) => {
                        setupAlert(msg, isSuccess)
                    }}
                    langNow={lang.name}
                    changeLang={(newLang) => setLang({ name: newLang })}
                />
            )}
        </>
    )
}