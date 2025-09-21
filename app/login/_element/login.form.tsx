import { ALERT_NAME } from "@/app/constant/constant";
import { CE_Button } from "@/components/Button";
import { CE_Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { I_User } from "@/services/api/user/api.user.get.int";
import { globalEmitter } from "@/services/function/globalEmitter";
import { isPhoneValid } from "@/services/function/isPhoneValid";
import { CommonActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { doLogin } from "../_function/do.login";
import { locales } from "../locales";

interface I_Props{
    language: typeof locales["id"]
    setMemberExpired:(data: boolean) => void
    setIsMembershipOpen:(isOpen: boolean) => void
    setUserData:(user: I_User) => void
}

export function LoginForm(props: I_Props) {
    const screenHeight = Dimensions.get("window").height
    
    const router = useRouter()
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumebrWarning, setPhoneNumberWarning] = useState('')
    const [first, setFirst] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [remember, setRemember] = useState(false)

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
            const loginPayload = {
                phone: phoneNumber,
                password: password
            }

            const result = await doLogin(loginPayload, remember)

            if (!result || (result.user && !result.user.membership)) {
                setupAlert("Connection error. Please try again in 5 minutes.", false)
                return
            }
            
            if (result.meta.status === "success") {
                if (result.user && !result.user.membership.is_member) { // if not a member : member expired (check on be API_Login when hit nestjs) or trial ends will makes isMember false, redirect to purchase page
                    props.setMemberExpired(true)
                    props.setUserData(result.user)
                    return 
                } else { // isMember true (even a trial member)
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "(tabs)" }],
                        })
                    )
                }
            } else {
                setupAlert(result.meta.message, false)
            }
            setIsLoading(false)
        }, 2000)
    }

    const setupAlert = (msg: string, isSuccess: boolean) => {
        globalEmitter.emit(ALERT_NAME, {
            message: msg,
            isSuccess: isSuccess,
        });
    }

    return (
        <>
            <View className="flex-1">
                <View className="flex flex-col gap-2 mb-3">
                    <Input
                        label={props.language.form.phone}
                        keyboardType="numeric"
                        placeholder="081xxx"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    {phoneNumebrWarning && (<Text className="text-danger">{phoneNumebrWarning}</Text>)}
                    <Input
                        label={props.language.form.password}
                        placeholder="password"
                        value={password}
                        type="password"
                        onChangeText={setPassword}
                    />
                </View>
                <CE_Checkbox checked={remember} onChange={() => setRemember(prev => !prev)} label={props.language.form.remember} className="mb-2"/>
                <CE_Button title={props.language.button.signin} disabled={!isPhoneValid(phoneNumber) || !password} onPress={() => login()} isLoading={isLoading}/>
                <View className="flex-row items-center w-full my-4">
                    <View className="flex-1 h-px bg-gray-300" />
                    <Text className="mx-4 text-gray-500">{props.language.form.or}</Text>
                    <View className="flex-1 h-px bg-gray-300" />
                </View>
                <CE_Button title={props.language.button.register} bgColor="bg-secondary" onPress={() => router.replace("/register")}/>
            </View>
        </>
    )
}