import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { isPhoneValid } from "@/services/function/isPhoneValid";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface I_Props{
    name: string
    password: string
    rePassword: string
    phoneNumber: string
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
            setPassWarn("Password is not match!")
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
                    label="Name"
                    placeholder="name"
                    value={props.name}
                    onChangeText={props.setName}
                />
                <Input
                    label="Phone Number"
                    keyboardType="numeric"
                    placeholder="081xxx"
                    value={props.phoneNumber}
                    onChangeText={props.setPhoneNumber}
                />
                {phoenNumWarning !== '' && (<Text className="text-danger">{phoenNumWarning}</Text>)}
                <Input
                    label="Password"
                    placeholder="password"
                    value={props.password}
                    onChangeText={props.setPassword}
                    />
                <Input
                    label="Retype Password"
                    placeholder="retype password"
                    value={props.rePassword}
                    onChangeText={props.setRePassword}
                />
                {passWarn !== '' && (<Text className="text-danger">{passWarn}</Text>)}
            </View>
            <CE_Button 
                title="Register" 
                disabled={!isPhoneValid(props.phoneNumber) || !props.password || !props.rePassword || !props.name} 
                onPress={() => registerChecker()}
            />
            <View className="flex-row items-center w-full my-4">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500">Or</Text>
                <View className="flex-1 h-px bg-gray-300" />
            </View>
            <CE_Button title="Sign In" bgColor="bg-secondary" onPress={() => router.replace("/login")}/>
        </View>
    )
}