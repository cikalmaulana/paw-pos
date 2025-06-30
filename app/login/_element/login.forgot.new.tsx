import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import { Text, View } from "react-native";

interface Props{
    setStep:(step: number) => void
}

export function ForgotNew(props: Props) {
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [warning, setWarning] = useState('')

    const submitNewPassword = () => {
        if(password !== rePassword) {
            setWarning("Password is not match!")
            return
        }

        props.setStep(5)
    }

    return (
        <View>
            <View className="flex flex-col gap-2 mb-3">
                <Input
                    label="New Password"
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    label="Retype New Password"
                    placeholder="retype password"
                    value={rePassword}
                    onChangeText={setRePassword}
                />
                {warning && (<Text className="text-danger">{warning}</Text>)}
            </View>
            <CE_Button title="Submit" disabled={password === '' || rePassword === ''} onPress={() => submitNewPassword()} className="mb-2"/>
            <CE_Button title="Cancel" onPress={() => props.setStep(0)} bgColor="bg-secondary"/>
        </View>
    )
}