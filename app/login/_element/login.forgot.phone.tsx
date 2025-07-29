import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { isPhoneValid } from "@/services/function/isPhoneValid";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { locales } from "../locales";

interface Props{
    language: typeof locales["id"]
    phoneNumber: string
    setOpen:(isOpen: boolean) => void
    setStep:(step: number, phoneNumber: string) => void
    setPhoneNumber:(phoneNumber: string) => void
}

export function ForgotPhone(props: Props) {
    const [phoneNumebrWarning, setPhoneNumberWarning] = useState('')
    const [first, setFirst] = useState(true)

    useEffect(() => {
        if(first) {
            setFirst(false)
            return
        }
        const trimmed = props.phoneNumber.trim()
        if(props.phoneNumber !== "" && props.phoneNumber.length > 1 && !trimmed.startsWith('08')) {
            setPhoneNumberWarning("Phone number must start with '08'")
        }else {
            setPhoneNumberWarning("")
        }
    },[props.phoneNumber])

    return (
        <View>
            <View className="flex flex-col gap-2 mb-3">
                <Input
                    label={props.language.form.phone}
                    keyboardType="numeric"
                    placeholder="081xxx"
                    value={props.phoneNumber}
                    onChangeText={props.setPhoneNumber}
                />
                {phoneNumebrWarning && (<Text className="text-danger">{phoneNumebrWarning}</Text>)}
            </View>
            <CE_Button title={props.language.button.next} disabled={!isPhoneValid(props.phoneNumber)} onPress={() => props.setStep(2, props.phoneNumber)} className="mb-2"/>
            <CE_Button title={props.language.button.backtologin} bgColor="bg-secondary" onPress={() => props.setOpen(false)}/>
        </View>
    )
}