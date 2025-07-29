import { CE_Button } from "@/components/Button"
import { OTPInput } from "@/components/OTP"
import { useEffect, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { locales } from "../locales"

interface Props {
    language: typeof locales["id"]
    setStep: (step: number) => void
}

export function ForgotOtp(props: Props) {
    const [otp, setOtp] = useState("")
    const [loadingSendSMS, setLoadingSendSMS] = useState(true)
    const [otpInput, setOtpInput] = useState("")
    const [warning, setWarning] = useState("")

    const sendOtpToSMS = () => {
        setLoadingSendSMS(true)
        setTimeout(() => {
            setLoadingSendSMS(false)
            setOtp("1234")
        }, 2000)
    }

    useEffect(() => {
        sendOtpToSMS()
    }, [])

    const matchingOTP = () => {
        if(otpInput !== otp) {
            setWarning(props.language.hint.wrongotp)
            return
        }

        props.setStep(4)
    }

    return (
        <View>
            {loadingSendSMS ? (
                <View className="flex flex-col items-center justify-center mb-10 mt-6">
                    <ActivityIndicator size="large" color="#16B8A8" />
                    <Text className="mt-4 text-base text-primary font-semibold">{props.language.hint.sendingotp}.</Text>
                </View>
            ) : (
                <View className="flex flex-col gap-2 mb-10 items-center justify-center">
                    {warning !== '' ? (
                        <Text className="text-danger font-semibold">{warning}</Text>
                    ) : (
                        <Text className="text-primary font-semibold">{props.language.hint.otpsent}</Text>
                    )}
                    
                    <OTPInput setOtp={(otp) => setOtpInput(otp)} />
                </View>
            )}

            <CE_Button
                title={props.language.button.next}
                disabled={otpInput.length < 4 || loadingSendSMS}
                onPress={() => matchingOTP()}
                className="mb-2"
            />
            <CE_Button
                title={props.language.button.cancel}
                onPress={() => props.setStep(1)}
                disabled={loadingSendSMS}
                bgColor="bg-secondary"
            />
        </View>
    )
}
