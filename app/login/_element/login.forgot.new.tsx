import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import { Text, View } from "react-native";
import { locales } from "../locales";

interface Props{
    language: typeof locales["id"]
    setStep:(step: number) => void
}

export function ForgotNew(props: Props) {
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [warning, setWarning] = useState('')

    const submitNewPassword = () => {
        if(password !== rePassword) {
            setWarning(props.language.hint.passnotmatch)
            return
        }

        props.setStep(5)
    }

    return (
        <View>
            <View className="flex flex-col gap-2 mb-3">
                <Input
                    label={props.language.forgot.newpassword}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    type="password"
                />
                <Input
                    label={props.language.forgot.retypepassword}
                    placeholder={props.language.forgot.retypepassword}
                    value={rePassword}
                    onChangeText={setRePassword}
                    type="password"
                />
                {warning && (<Text className="text-danger">{warning}</Text>)}
            </View>
            <CE_Button title={props.language.button.submit} disabled={password === '' || rePassword === ''} onPress={() => submitNewPassword()} className="mb-2"/>
            <CE_Button title={props.language.button.cancel} onPress={() => props.setStep(0)} bgColor="bg-secondary"/>
        </View>
    )
}