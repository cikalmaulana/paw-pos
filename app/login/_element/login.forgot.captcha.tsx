import { CE_Button } from "@/components/Button";
import { CaptchaBox } from "@/components/CaptchaBox";
import { Input } from "@/components/Input";
import { generateCaptcha } from "@/services/function/generateCaptcha";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface Props{
    setStep:(step: number) => void
}

export function ForgotCaptcha(props: Props) {
    const [captcha, setCaptcha] = useState('')
    const [captchaCode, setCaptchaCode] = useState('')
    const [warning, setWarning] = useState('')

    useEffect(() => {
        setCaptchaCode(generateCaptcha())
    }, [])

    const captchaChecker = () => {
        if(captcha !== captchaCode) {
            setWarning('Wrong Captcha!')
            setCaptchaCode(generateCaptcha())
            setCaptcha('')
            return
        }

        props.setStep(3)
    }

    return (
        <View>
            {warning !== "" && (
                <View className="w-full items-center mb-3">
                    <Text className="text-danger font-semibold text-center">
                    {warning}
                    </Text>
                </View>
            )}

            <CaptchaBox value={captchaCode} onRefresh={()=>setCaptchaCode(generateCaptcha())} className="flex flex-row w-full justify-center items-center" />

            <View className="flex flex-col gap-2 mb-3">
                <Input
                    label="Captcha"
                    placeholder="captcha"
                    value={captcha}
                    onChangeText={setCaptcha}
                />
            </View>

            <CE_Button
                title="Next"
                disabled={!captcha}
                onPress={() => captchaChecker()}
                className="mb-2"
            />
            <CE_Button title="Back" onPress={() => props.setStep(1)} bgColor="bg-secondary"/>
        </View>
    )
}