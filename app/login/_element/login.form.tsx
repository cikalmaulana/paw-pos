import { CE_Alert } from "@/components/Alert";
import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { isPhoneValid } from "@/services/function/isPhoneValid";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { doLogin } from "../_function/do.login";

export function LoginForm() {
    const router = useRouter()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumebrWarning, setPhoneNumberWarning] = useState('')
    const [first, setFirst] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [loginMsg, setLoginMsg] = useState('')

    useEffect(() => {
        if(first) {
            setFirst(false)
            return
        }
        const trimmed = phoneNumber.trim()
        if(phoneNumber !== "" && !trimmed.startsWith('08')) {
            setPhoneNumberWarning("Phone number must start with '08'")
        }else {
            setPhoneNumberWarning("")
        }
    },[phoneNumber])

    const login = async () => {
        setIsLoading(true)
        setTimeout(async () => {
            const result = await doLogin(phoneNumber, password);
            
            if (result.success) {
                router.replace("../home" as const)
            } else {
                setShowAlert(true)
                setLoginMsg(result.message)
            }
            setIsLoading(false);
        }, 2000);
    };

    return (
        <>
            {showAlert && (
                <CE_Alert 
                    showAlert={showAlert}
                    message={loginMsg}
                    isSuccess={false}
                />
            )}
            <View className="flex-1">
                <View className="flex flex-col gap-2 mb-3">
                    <Input
                        label="Phone Number"
                        keyboardType="numeric"
                        placeholder="081xxx"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    {phoneNumebrWarning && (<Text className="text-danger">{phoneNumebrWarning}</Text>)}
                    <Input
                        label="Password"
                        placeholder="password"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <CE_Button title="sign in" disabled={!isPhoneValid(phoneNumber) || !password} onPress={() => login()} isLoading={isLoading}/>
                <View className="flex-row items-center w-full my-4">
                    <View className="flex-1 h-px bg-gray-300" />
                    <Text className="mx-4 text-gray-500">Or</Text>
                    <View className="flex-1 h-px bg-gray-300" />
                </View>
                <CE_Button title="Register" bgColor="bg-secondary" onPress={() => router.replace("/register")}/>
            </View>
        </>
    )
}