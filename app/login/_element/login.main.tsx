import { CE_Alert } from "@/components/Alert";
import { CE_Button } from "@/components/Button";
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { I_User } from "@/services/api/user/api.user.get.int";
import { useLang } from "@/services/function/LangContext";
import { useLocale } from "@/services/function/useLocale";
import { useState } from "react";
import { View } from "react-native";
import { locales } from "../locales";
import ModalChangeLanguage from "./login.change.lang";
import { ForgotForm } from "./login.forgot.main";
import { LoginForm } from "./login.form";
import LoginMembership from "./login.membership";
import LoginMembershipExpired from "./login.membership.expired";

export function LoginMain(){
    const { lang, setLang } = useLang()
    const language = useLocale(lang, locales)
    
    const [isForgotOpen, setForgotOpen] = useState(false)
    const [isMembershipOpen, setIsMembershipOpen] = useState(false)
    const [isMemberExpired, setIsMemberExpired] = useState(false)
    const [userData, setUserData] = useState<I_User | null>(null)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [modalLangOpen, setModalLangOpen] = useState(false)

    return (
        <>
            {showAlert && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 20,
                        right: 20,
                        zIndex: 999
                    }}
                >
                    <CE_Alert
                        message={alertMsg}
                        isSuccess={alertSuccess}
                        showAlert={showAlert}
                        onClose={() => setShowAlert(false)}
                    />
                </View>
            )}

            {(isMemberExpired && userData) ? (
                <LoginMembershipExpired user={userData}/>
            ) : (isMembershipOpen && userData) ? (
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
                        setShowAlert(true)
                        setAlertMsg(msg)
                        setAlertSuccess(isSuccess)
                    }}
                    langNow={lang.name}
                    changeLang={(newLang) => setLang({ name: newLang })}
                />
            )}
        </>
    )
}