import ModalChangeLanguage from "@/app/login/_element/login.change.lang";
import { CE_Alert } from "@/components/Alert";
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { globalEmitter } from "@/services/function/globalEmitter";
import { useLang } from "@/services/function/LangContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, View } from "react-native";
import { doRegister } from "../_function/do.register";
import { RegisterCaptcha } from "./register.captcha";
import { RegisterForm } from "./register.form";
import { RegisterOTP } from "./register.otp";

const ALERT_NAME = 'alert-register'

export function RegisterMain(){
    const screenHeight = Dimensions.get("window").height
    const router = useRouter()
    const { lang, setLang } = useLang()
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [modalLangOpen, setModalLangOpen] = useState(false)

    const nextStep = async (newStep: number) => {
        if (newStep === 4) {
            setIsLoading(true)
            setTimeout(async () => {
                const result = await doRegister({ name, password, phone: phoneNumber });
                if (result.meta.status === "success") {
                    router.replace({
                        pathname: "../welcome",
                        params: {
                        isSuccess: "true",
                        message: result.meta.message,
                        },
                    } as const);
                } else {
                    setupAlert(result.meta.message,false)
                }
                setIsLoading(false)
            }, 2000)
        } else {
            setStep(newStep);
        }
    };

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
                title="Register"
                modalOpen={modalLangOpen}
                openModalChangeLang={(open) => setModalLangOpen(open)}
            >
                {step === 1 && (
                    <RegisterForm 
                        name={name}
                        phoneNumber={phoneNumber}
                        password={password}
                        rePassword={rePassword}
                        setName={setName}
                        setPhoneNumber={setPhoneNumber}
                        setPassword={setPassword}
                        setRePassword={setRePassword}
                        submit={() => nextStep(2)}
                    />
                )}
                {step === 2 && (
                    <RegisterCaptcha 
                        setNext={(newStep) => nextStep(newStep)}
                    />
                )}
                {step === 3 && (
                    <RegisterOTP
                        setNext={(newStep) => nextStep(newStep)}
                        isLoading={isLoading}
                    />
                )}
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