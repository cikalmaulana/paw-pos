import { CE_Alert } from "@/components/Alert";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { doForgot } from "../_function/do.forgot";
import { ForgotCaptcha } from "./login.forgot.captcha";
import { ForgotNew } from "./login.forgot.new";
import { ForgotOtp } from "./login.forgot.otp";
import { ForgotPhone } from "./login.forgot.phone";

interface Props{
    setOpen:(isOpen: boolean) => void
}

export function ForgotForm(props: Props) {
    const router = useRouter()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [captcha, setCaptcha] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState(1)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("")
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
                setAlertMsg(result.message);
                setShowAlert(true);
            }
            setIsLoading(false)
        }
    }

    return (
        <>
            {showAlert && (
                <CE_Alert
                    message={alertMsg}
                    isSuccess={false}
                    showAlert={showAlert}
                    onClose={() => setShowAlert(false)}
                />
            )}
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