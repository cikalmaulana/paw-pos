import { CE_BackButton } from "@/components/BackButton";
import { CE_Card } from "@/components/Card";
import { I_Store } from "@/services/api/store/api.store.int";
import { priceFormat } from "@/services/function/formatPrice";
import { updateStoreData } from "@/services/function/updateStoreData";
import { useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, View } from "react-native";
import StoreBalance from "./_element/store.balance";
import StoreDetail from "./_element/store.detail";
import StoreManagementList from "./_element/store.list.mgm";
import StoreTransactionMgmList from "./_element/store.list.transaction.mgm";
import StoreReceipt from "./_element/store.reeipt";
import StoreSetting from "./_element/store.setting";
import StoreStockManagement from "./_element/store.stock.mgm";

const screenHeight = Dimensions.get("window").height

interface I_Props {
    storeData:I_Store
    balance: string
    handleBack:()=>void
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
    setStoreData:(data: I_Store) => void
}

export default function ManageStore(props: I_Props){
    const [balance, setBalance] = useState(props.storeData.balance)
    const [manageOpen, setManageOpen] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [showAlert, setAlertShow] = useState(false)
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')

    const onRefresh = async () => {
        setRefreshing(true)
        await getStoreData()
        setRefreshing(false)
    }

    const getStoreData = async () => {
        const result = await updateStoreData()
        if(result !== null) {
            setBalance(result.balance)
            props.setStoreData(result)
        } else {
            setupAlert("Failed to refresh user data. Please try again.", false)
        }
    }

    const setupAlert = (msg: string, isSuccess: boolean) => {
        props.setAlertMsg(msg)
        props.setAlertSuccess(isSuccess)
        props.setShowAlert(true)
    }

    return (
        <View>
            {(manageOpen === '' || manageOpen === 'balance') && 
                <View>
                    {manageOpen === 'balance' && (
                        <StoreBalance 
                            balance={balance}
                            setBalance={setBalance}
                            onClose={() => setManageOpen('')}
                            setUpAlert={(msg: string, isSuccess: boolean) => setupAlert(msg, isSuccess)}
                        />
                    )}
                    <View>
                        <CE_BackButton lable="Manage Store" onPress={props.handleBack}/>
                        <KeyboardAvoidingView 
                            behavior={Platform.OS === "ios" ? "padding" : "height"} 
                            keyboardVerticalOffset={100}
                        >

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
                                contentContainerStyle={{ paddingBottom: 700 }}
                                showsVerticalScrollIndicator={false}
                            >
                                <Text className="text-secondary text-3xl font-bold mb-3">{props.storeData.name}</Text>
                                <CE_Card className="bg-primary p-5 flex justify-center mb-8">
                                    <Text className="text-white font-semibold text-lg">Store Balance</Text>
                                    <Text className="text-white font-bold text-3xl">{priceFormat(balance, "IDR")}</Text>
                                </CE_Card>

                                <StoreManagementList 
                                    handleSelect={(key) => setManageOpen(key)}
                                />

                                <StoreSetting 
                                    setUpAlert={(msg: string, isSuccess: boolean) => setupAlert(msg, isSuccess)}
                                />

                                <StoreTransactionMgmList 
                                    tax="10"
                                    service="10"
                                    handleSelect={(key) => setManageOpen(key)}
                                    setUpAlert={(msg: string, isSuccess: boolean) => setupAlert(msg, isSuccess)}
                                />

                                <StoreStockManagement 
                                    lowStock="10"
                                    veryLowStock="5"
                                />
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            }

            {manageOpen === 'detail' && (
                <StoreDetail 
                    storeData={props.storeData}
                    handleBack={() => setManageOpen('')}
                    setStoreData={props.setStoreData}
                    setUpAlert={(msg: string, isSuccess: boolean) => setupAlert(msg, isSuccess)}
                    doRefresh={async () => {
                        await onRefresh()
                        setManageOpen('')
                    }}
                />
            )}

            {manageOpen === 'receipt' && (
                <StoreReceipt
                    storeData={props.storeData}
                    handleBack={() => setManageOpen('')}
                    setUpAlert={(msg: string, isSuccess: boolean) => setupAlert(msg, isSuccess)}
                />
            )}
        </View>
    )
}