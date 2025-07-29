import { ALERT_NAME } from "@/app/constant/constant";
import { globalEmitter } from "@/services/function/globalEmitter";
import { useLang } from "@/services/function/LangContext";
import { useLocale } from "@/services/function/useLocale";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { doForgot } from "../_function/do.forgot";
import { locales } from "../locales";
import { ForgotCaptcha } from "./login.forgot.captcha";
import { ForgotNew } from "./login.forgot.new";
import { ForgotOtp } from "./login.forgot.otp";
import { ForgotPhone } from "./login.forgot.phone";

interface Props{
    setOpen:(isOpen: boolean) => void
}

export function ForgotForm(props: Props) {
    
    const { lang, setLang } = useLang()
    const language = useLocale(lang, locales)
    const router = useRouter()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [captcha, setCaptcha] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const goToStep = (step: number) => {
        setStep(step)
        if(step === 0){
            props.setOpen(false)
        }
        else if(step === 1) {
            setCaptcha('')
            setNewPhoneNumber('')
            setOtp('')
        }
        else if(step === 5){
            setIsLoading(true)
            const result = doForgot(newPhoneNumber)
            if (result.success) {
                router.replace({
                    pathname: "../welcome",
                    params: {
                    isSuccess: "true",
                    message: result.message,
                    },
                } as const);
            } else {
                setupAlert(result.message, true)
            }
            setIsLoading(false)
        }
    }

    const setupAlert = (msg: string, isSuccess: boolean) => {
        globalEmitter.emit(ALERT_NAME, {
            message: msg,
            isSuccess: isSuccess,
        });
    }

    return (
        <>
            <View className="flex-1">
                {step === 1 && (
                    <ForgotPhone
                        language={language}
                        phoneNumber={phoneNumber}
                        setOpen={(isOpen) => props.setOpen(isOpen)} 
                        setStep={(step) => goToStep(step)}
                        setPhoneNumber={(phoneNumber) => setPhoneNumber(phoneNumber)}
                    />
                )}

                {step === 2 && (
                    <ForgotCaptcha 
                        language={language}
                        setStep={(step) => goToStep(step)}
                    />
                )}

                {step === 3 && (
                    <ForgotOtp 
                        language={language}
                        setStep={(step) => goToStep(step)}
                    />
                )}

                {step === 4 && (
                    <ForgotNew 
                        language={language}
                        setStep={(step) => goToStep(step)}
                    />
                )}
            </View>
        </>
    )
}