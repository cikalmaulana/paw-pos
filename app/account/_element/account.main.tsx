import { CE_Alert } from "@/components/Alert"
import { CE_Button } from "@/components/Button"
import { CE_Card } from "@/components/Card"
import { I_Store } from "@/services/api/api.store.int"
import { I_User } from "@/services/api/api.user.get.int"
import { priceFormat } from "@/services/function/formatPrice"
import { doLogout } from "@/services/function/logout"
import { updateStoreData } from "@/services/function/updateStoreData"
import { updateUserData } from "@/services/function/updateUserData"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { Dimensions, Image, Modal, RefreshControl, ScrollView, Text, View } from "react-native"
import AccountDetails from "./account.detail"
import AccountSettingList from "./account.setting.list"

interface I_Props {
    userData: I_User
    storeData: I_Store
}

export default function AccountMain(props: I_Props) {
    const [userData, setUserData] = useState<I_User>(props.userData)
    const [balance, setBalance] = useState(props.storeData.balance)
    const navigation = useNavigation<any>();
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [manageOpen, setManageOpen] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const screenHeight = Dimensions.get("window").height

    const onRefresh = async () => {
        setRefreshing(true)
        await getNewUserData()
        await getNewStoreData()
        setRefreshing(false)
    }

    useEffect(() => {
        onRefresh()
    },[])

    const getNewUserData = async () => {
        const result = await updateUserData()
        if(result !== null) {
            setUserData(result)
        } else {
            setAlertMsg("Failed to refresh user data. Please try again.")
            setAlertSuccess(false)
            setShowAlert(true)
        }
    }

    const getNewStoreData = async () => {
        const result = await updateStoreData()
        if(result !== null) {
            setBalance(result.balance)
        } else {
            setAlertMsg("Failed to refresh user data. Please try again.")
            setAlertSuccess(false)
            setShowAlert(true)
        }
    }

    const logout = async () => {
        const result = await doLogout();
        if (!result.success) {
            setAlertMsg("Failed to logout. Please try again in 5 minutes.")
            setShowAlert(true)
            setAlertSuccess(false)
        } else {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "(tabs)" }],
                })
            )
        }
    }

    const handleBack = async () => {
        setManageOpen('')
        getNewUserData()
    }

    return (
        <View className="min-h-screen mx-5" >
            {showAlert && (
                <View style={{ top: screenHeight * -0.1 }}>
                    <CE_Alert 
                        message={alertMsg} 
                        isSuccess={alertSuccess} 
                        showAlert={showAlert} 
                        onClose={() => setShowAlert(false)}         
                    />
                </View>
            )}
            <View className="flex flex-row gap-2 items-center mb-4 mt-4">
                <Text className="text-primary font-bold text-2xl">
                {userData.name.length > 20
                    ? userData.name.slice(0, 20) + '...'
                    : userData.name}
                </Text>
                <Text>|</Text>
                <Text className="text-secondary font-semibold text-lg">
                {userData.id === props.storeData.owner_id ? "Owner" : "Cashier"}
                </Text>
            </View>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#16B8A8"]}       
                        tintColor="#16B8A8"        
                        title="Loading..."         
                        titleColor="#16B8A8"        
                    />
                }
                showsVerticalScrollIndicator={false}
            >
                {manageOpen === '' ? (
                        <>
                            <CE_Card className="bg-primary p-5 flex justify-center mb-8">
                                <Text className="text-white font-semibold text-lg">Store Balance</Text>
                                <Text className="text-white font-bold text-3xl">{priceFormat(balance, "IDR")}</Text>
                            </CE_Card>
                
                            <AccountSettingList setManageOpen={(page) => setManageOpen(page)} doLogout={() => setIsModalOpen(true)}/>
                        </>
                    ) : 
                    manageOpen === 'detail' && (
                        <AccountDetails 
                            userData={userData} 
                            handleBack={() => handleBack()}
                            setShowAlert={setShowAlert}
                            setAlertMsg={setAlertMsg}
                            setAlertSuccess={setAlertSuccess}
                        />
                    )
                }
            </ScrollView>


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
