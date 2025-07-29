import { ALERT_NAME } from "@/app/constant/constant";
import ModalChangeLanguage from "@/app/login/_element/login.change.lang";
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { globalEmitter } from "@/services/function/globalEmitter";
import { useLang } from "@/services/function/LangContext";
import { useLocale } from "@/services/function/useLocale";
import { useRouter } from "expo-router";
import { useState } from "react";
import { doRegister } from "../_function/do.register";
import { locales } from "../locales";
import { RegisterCaptcha } from "./register.captcha";
import { RegisterForm } from "./register.form";
import { RegisterOTP } from "./register.otp";

export function RegisterMain(){
    const router = useRouter()
    const { lang, setLang } = useLang()
    const language = useLocale(lang, locales)
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
                    setTimeout(() => {
                        setupAlert(language.hint.successregister,true)
                    },200)
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
            <LoginRegisterLayout 
                title={language.title}
                modalOpen={modalLangOpen}
                openModalChangeLang={(open) => setModalLangOpen(open)}
            >
                {step === 1 && (
                    <RegisterForm 
                        language={language}
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
                        language={language}
                        setNext={(newStep) => nextStep(newStep)}
                    />
                )}
                {step === 3 && (
                    <RegisterOTP
                        language={language}
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