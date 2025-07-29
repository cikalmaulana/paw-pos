import { CE_Alert } from "@/components/Alert";
import { globalEmitter } from "@/services/function/globalEmitter";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, View } from "react-native";
import { doForgot } from "../_function/do.forgot";
import { ForgotCaptcha } from "./login.forgot.captcha";
import { ForgotNew } from "./login.forgot.new";
import { ForgotOtp } from "./login.forgot.otp";
import { ForgotPhone } from "./login.forgot.phone";

interface Props{
    setOpen:(isOpen: boolean) => void
}

const ALERT_NAME = 'alert-forgot'

export function ForgotForm(props: Props) {
    const screenHeight = Dimensions.get("window").height
    
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
            <View className="flex-1">
                {step === 1 && (
                    <ForgotPhone
                        phoneNumber={phoneNumber}
                        setOpen={(isOpen) => props.setOpen(isOpen)} 
                        setStep={(step) => goToStep(step)}
                        setPhoneNumber={(phoneNumber) => setPhoneNumber(phoneNumber)}
                    />
                )}

                {step === 2 && (
                    <ForgotCaptcha 
                        setStep={(step) => goToStep(step)}
                    />
                )}

                {step === 3 && (
                    <ForgotOtp 
                        setStep={(step) => goToStep(step)}
                    />
                )}

                {step === 4 && (
                    <ForgotNew 
                        setStep={(step) => goToStep(step)}
                    />
                )}
            </View>
        </>
    )
}