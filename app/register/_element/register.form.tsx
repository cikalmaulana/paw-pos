import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { isPhoneValid } from "@/services/function/isPhoneValid";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { locales } from "../locales";

interface I_Props{
    name: string
    password: string
    rePassword: string
    phoneNumber: string
    language: typeof locales["id"]
    setName:(name: string) => void
    setPassword:(passwrod: string) => void
    setRePassword:(rePassword: string) => void
    setPhoneNumber:(phone: string) => void
    submit:(step: number) => void
}

export function RegisterForm(props: I_Props){
    const router = useRouter()
    const [phoenNumWarning, setPhoneNumWarning] = useState('')
    const [passWarn, setPassWarn] = useState('')
    const [registerWarn, setRegisterWarn] = useState('')
    const [first, setFirst] = useState(true)

    useEffect(() => {
        if(first) {
            setFirst(false)
            return
        }
        const trimmed = props.phoneNumber.trim()
        if(props.phoneNumber !== "" && props.phoneNumber.length > 1 && !trimmed.startsWith('08')) {
            setPhoneNumWarning("Phone number must start with '08'")
        }else {
            setPhoneNumWarning("")
        }
    },[props.phoneNumber])

    useEffect(() => {
        if(first) {
            setFirst(false)
            return
        }
        if(props.password !== props.rePassword) {
            setPassWarn(props.language.hint.notmatch)
            return
        } else {
            setPassWarn('')
        }
    }, [props.password, props.rePassword])

    const registerChecker = () => {
        // check phone is avail
        const isPhoneUsed = false
        if (isPhoneUsed) {
            setPhoneNumWarning("Phone number is already use")
            return
        }
        if (props.password !== '' && props.rePassword !== '' && props.password !== props.rePassword) {
            setPassWarn("Password is not match")
            return
        }
        props.submit(2)
    }
        
    return (
        <View>
            <View className="flex flex-col gap-2 mb-3">
                <Input
                    label={props.language.form.name}
                    placeholder={props.language.form.name}
                    value={props.name}
                    onChangeText={props.setName}
                />
                <Input
                    label={props.language.form.phone}
                    keyboardType="numeric"
                    placeholder="081xxx"
                    value={props.phoneNumber}
                    onChangeText={props.setPhoneNumber}
                />
                {phoenNumWarning !== '' && (<Text className="text-danger">{phoenNumWarning}</Text>)}
                <Input
                    label={props.language.form.password}
                    placeholder={props.language.form.password}
                    value={props.password}
                    onChangeText={props.setPassword}
                    type="password"
                />
                <Input
                    label={props.language.form.repassword}
                    placeholder={props.language.form.repassword}
                    value={props.rePassword}
                    onChangeText={props.setRePassword}
                    type="password"
                />
                {passWarn !== '' && (<Text className="text-danger">{passWarn}</Text>)}
            </View>
            <CE_Button 
                title={props.language.button.register}
                disabled={!isPhoneValid(props.phoneNumber) || !props.password || !props.rePassword || !props.name} 
                onPress={() => registerChecker()}
            />
            <View className="flex-row items-center w-full my-4">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500">{props.language.button.or}</Text>
                <View className="flex-1 h-px bg-gray-300" />
            </View>
            <CE_Button title={props.language.button.signin} bgColor="bg-secondary" onPress={() => router.replace("/login")}/>
        </View>
    )
}