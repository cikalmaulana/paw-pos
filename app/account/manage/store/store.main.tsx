import { CE_BackButton } from "@/components/BackButton";
import { CE_Card } from "@/components/Card";
import { CE_Loading } from "@/components/Loading";
import { I_Lang } from "@/services/api/other/api.language.int";
import { I_Store } from "@/services/api/store/api.store.int";
import { priceFormat } from "@/services/function/formatPrice";
import { updateStoreData } from "@/services/function/updateStoreData";
import { useLocale } from "@/services/function/useLocale";
import { lazy, Suspense, useState } from "react";
import { KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, View } from "react-native";
import StoreBalance from "./_element/store.balance";
import StoreDetail from "./_element/store.detail";
import StoreDiscount from "./_element/store.discount";
import StoreManagementList from "./_element/store.list.mgm";
import StoreTransactionMgmList from "./_element/store.list.transaction.mgm";
import StoreSetting from "./_element/store.setting";
import StoreStockManagement from "./_element/store.stock.mgm";
import { locales } from "./locales";

const StoreReceipt = lazy(() => import('../store/_element/store.receipt'))

interface I_Props {
    lang: I_Lang
    storeData:I_Store
    balance: string
    handleBack:()=>void
    setupAlert:(msg: string, isSuccess: boolean)=>void
    setStoreData:(data: I_Store) => void
}

export default function ManageStore(props: I_Props){
    const language = useLocale(props.lang, locales)
    
    const [balance, setBalance] = useState(props.storeData.balance)
    const [manageOpen, setManageOpen] = useState('')
    const [refreshing, setRefreshing] = useState(false)

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
            props.setupAlert("Failed to refresh user data. Please try again.", false)
        }
    }

    return (
        <View>
            {(manageOpen === '' || manageOpen === 'balance') && 
                <View>
                    {manageOpen === 'balance' && (
                        <StoreBalance 
                            language={language}
                            balance={balance}
                            setBalance={setBalance}
                            onClose={() => setManageOpen('')}
                            setUpAlert={(msg: string, isSuccess: boolean) => props.setupAlert(msg, isSuccess)}
                        />
                    )}
                    <View>
                        <CE_BackButton lable={language.title} onPress={props.handleBack}/>
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
                                    <Text className="text-white font-semibold text-lg">{language.balance}</Text>
                                    <Text className="text-white font-bold text-3xl">{priceFormat(balance, "IDR")}</Text>
                                </CE_Card>

                                <StoreManagementList 
                                    language={language}
                                    handleSelect={(key) => setManageOpen(key)}
                                />

                                <StoreSetting 
                                    language={language}
                                    setUpAlert={(msg: string, isSuccess: boolean) => props.setupAlert(msg, isSuccess)}
                                />

                                <StoreTransactionMgmList 
                                    language={language}
                                    tax="10"
                                    service="10"
                                    handleSelect={(key) => setManageOpen(key)}
                                    setUpAlert={(msg: string, isSuccess: boolean) => props.setupAlert(msg, isSuccess)}
                                />

                                <StoreStockManagement 
                                    language={language}
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
                    language={language}
                    storeData={props.storeData}
                    refreshing={refreshing}
                    handleBack={() => setManageOpen('')}
                    setStoreData={props.setStoreData}
                    setUpAlert={(msg: string, isSuccess: boolean) => props.setupAlert(msg, isSuccess)}
                    doRefresh={async () => {
                        await onRefresh()
                    }}
                />
            )}

            {manageOpen === 'receipt' && (
                <Suspense fallback={
                    <CE_Loading />
                }>
                    <StoreReceipt
                        language={language}
                        storeData={props.storeData}
                        handleBack={() => setManageOpen('')}
                        setUpAlert={(msg: string, isSuccess: boolean) => props.setupAlert(msg, isSuccess)}
                    />
                </Suspense>
            )}

            {manageOpen === 'discount' && (
                <Suspense fallback={
                    <CE_Loading />
                }>
                    <StoreDiscount
                        language={language}
                        storeData={props.storeData}
                        refreshing={refreshing}
                        handleBack={() => setManageOpen('')}
                        setStoreData={props.setStoreData}
                        setUpAlert={(msg: string, isSuccess: boolean) => props.setupAlert(msg, isSuccess)}
                        doRefresh={async () => {
                            await onRefresh()
                        }}
                    />
                </Suspense>
            )}
        </View>
    )
}