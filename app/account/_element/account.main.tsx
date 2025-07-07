import { CE_Alert } from "@/components/Alert"
import { CE_Button } from "@/components/Button"
import { CE_Card } from "@/components/Card"
import { I_Store } from "@/services/api/api.store.int"
import { I_User } from "@/services/api/api.user.get.int"
import { priceFormat } from "@/services/function/formatPrice"
import { doLogout } from "@/services/function/logout"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Image, Modal, Text, View } from "react-native"
import AccountDetails from "./account.detail"
import AccountSettingList from "./account.setting.list"

interface I_Props {
    userData: I_User
    storeData: I_Store
}

export default function AccountMain(props: I_Props) {
    const navigation = useNavigation();
    const router = useRouter()
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [manageOpen, setManageOpen] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

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

            {manageOpen === '' ? (
                <>
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
        
                    <AccountSettingList setManageOpen={(page) => setManageOpen(page)} doLogout={() => setIsModalOpen(true)}/>
                </>
            ) : 
                manageOpen === 'detail' && (<AccountDetails userData={props.userData} handleBack={() => setManageOpen('')}/>)
            }

            <Modal
                visible={isModalOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsModalOpen(false)}
            >
                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                    <View className="bg-white p-5 rounded-xl w-full">
                        <View className="w-full flex items-center justify-center mb-3">
                            <Image 
                                source={require('@/assets/icons/warning.png')}
                                style={{width: 52, height: 52}}
                            />
                        </View>
                        <Text className="text-lg font-semibold text-center mb-4">Are you sure you want to logout?</Text>
                        <View className="flex flex-row justify-between gap-3">
                            <CE_Button 
                                title="Cancel" 
                                onPress={() => setIsModalOpen(false)} 
                                className="flex-1" 
                            />
                            <CE_Button
                                title="Logout"
                                bgColor="bg-danger"
                                onPress={() => {
                                    logout()
                                    setIsModalOpen(false)
                                }}
                                className="flex-1"
                            />
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}
