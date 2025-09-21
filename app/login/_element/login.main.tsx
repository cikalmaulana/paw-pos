import { CE_Alert } from "@/components/Alert";
import { CE_Button } from "@/components/Button";
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { I_User } from "@/services/api/user/api.user.get.int";
import { globalEmitter } from "@/services/function/globalEmitter";
import { useLang } from "@/services/function/LangContext";
import { useLocale } from "@/services/function/useLocale";
import { useState } from "react";
import { Dimensions, View } from "react-native";
import { locales } from "../locales";
import ModalChangeLanguage from "./login.change.lang";
import { ForgotForm } from "./login.forgot.main";
import { LoginForm } from "./login.form";
import LoginMembership from "./login.membership";

const ALERT_NAME = 'alert-login-main'

export function LoginMain(){
    const screenHeight = Dimensions.get("window").height
    
    const { lang, setLang } = useLang()
    const language = useLocale(lang, locales)
    
    const [isForgotOpen, setForgotOpen] = useState(false)
    const [isMembershipOpen, setIsMembershipOpen] = useState(false)
    const [isMemberExpired, setIsMemberExpired] = useState(false)
    const [userData, setUserData] = useState<I_User | null>(null)
    const [modalLangOpen, setModalLangOpen] = useState(false)

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

            {((isMemberExpired || isMembershipOpen) && userData) ? (
                <LoginMembership user={userData}/>
            ) : (
                <LoginRegisterLayout 
                    title={!isForgotOpen ? language.title.signin : language.title.forgot}
                    modalOpen={modalLangOpen}
                    openModalChangeLang={(open) => setModalLangOpen(open)}    
                >
                    {!isForgotOpen ? (
                        <>
                            <LoginForm 
                                language={language}
                                setIsMembershipOpen={setIsMembershipOpen} 
                                setUserData={setUserData} 
                                setMemberExpired={setIsMemberExpired}
                            />
                            <CE_Button 
                                title={language.button.forgot}
                                onPress={() => setForgotOpen(true)} bgColor="bg-secondary"
                                className="mt-3"
                            />
                        </>
                    ) : (
                        <ForgotForm setOpen={(isOpen) => setForgotOpen(isOpen)} />
                    )}
                </LoginRegisterLayout>
            )}

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