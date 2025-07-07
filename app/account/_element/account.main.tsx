import { CE_Alert } from "@/components/Alert"
import { CE_Card } from "@/components/Card"
import { I_Store } from "@/services/api/api.store.int"
import { I_User } from "@/services/api/api.user.get.int"
import { priceFormat } from "@/services/function/formatPrice"
import { doLogout } from "@/services/function/logout"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import AccountSettingList from "./account.setting.list"

interface I_Props {
    userData: I_User
    storeData: I_Store
}

export default function AccountMain(props: I_Props) {
    const navigation = useNavigation();
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [manageOpen, setManageOpen] = useState('')

    const logout = async () => {
        const result = await doLogout();
        if (!result.success) {
            setAlertMsg("Failed to logout. Please try again in 5 minutes.")
            setShowAlert(true)
        } else {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "(tabs)" }],
                })
            )
        }
    }

    return (
        <View className="min-h-screen mx-5">
            {showAlert && (
                <CE_Alert 
                    message={alertMsg} 
                    isSuccess={false} 
                    showAlert={showAlert} 
                    onClose={() => setShowAlert(false)}               
                />
            )}
            <View className="flex flex-row gap-2 items-center mb-8">
                <Text className="text-primary font-bold text-2xl">
                    {props.userData.name.length > 20
                        ? props.userData.name.slice(0, 20) + '...'
                        : props.userData.name}
                </Text>
                <Text>|</Text>
                <Text className="text-secondary font-semibold text-lg">
                    {props.userData.id === props.storeData.owner_id ? "Owner" : "Cashier"}
                </Text>
            </View>

            <CE_Card className="bg-primary p-5 flex justify-center mb-8">
                <Text className="text-white font-semibold text-lg">Store Balance</Text>
                <Text className="text-white font-bold text-3xl">{priceFormat(props.storeData.balance, "IDR")}</Text>
            </CE_Card>

            <AccountSettingList setManageOpen={setManageOpen}/>

            <Pressable className="mt-10 items-center" onPress={() => logout()}>
                <Text className="text-danger text-lg font-semibold">Logout</Text>
            </Pressable>
        </View>
    )
}
