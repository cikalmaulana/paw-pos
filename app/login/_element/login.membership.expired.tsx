import { CE_Alert } from "@/components/Alert";
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { I_User } from "@/services/api/user/api.user.get.int";
import { globalEmitter } from "@/services/function/globalEmitter";
import { useLang } from "@/services/function/LangContext";
import { useState } from "react";
import { Dimensions, View } from "react-native";
import ModalChangeLanguage from "./login.change.lang";

interface I_Props{
    user: I_User
}

const ALERT_NAME = 'alert-login-membership-exp'

export default function LoginMembershipExpired(props: I_Props){ // condition : isMember false && member_type '' && 
    const screenHeight = Dimensions.get("window").height
    
    const { lang, setLang } = useLang()
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
            
            <LoginRegisterLayout 
                title="Membership Plan"
                modalOpen={modalLangOpen}
                openModalChangeLang={(open) => setModalLangOpen(open)}
            >
                <View>
                    
                </View>
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