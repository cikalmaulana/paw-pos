import { CE_BackButton } from "@/components/BackButton";
import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { I_Store } from "@/services/api/store/api.store.int";
import { API_GetReceiptSetting, API_SetReceiptSetting } from "@/services/api/transactional/api.receipt";
import { I_Receipt, I_SetReceiptSettingRequest } from "@/services/api/transactional/api.receipt.int";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, View } from "react-native";
import { locales } from "../locales";
import StorePreviewReceipt from "./store.receipt.preview";

interface I_Props{
    language: typeof locales["id"]
    storeData: I_Store
    handleBack:()=>void
    setUpAlert:(msg: string, isSuccess: boolean)=>void
}

export default function StoreReceipt(props: I_Props) {
    const [receiptData, setReceiptData] = useState<I_Receipt | undefined>()
    const [previewMode, setPreviewMode] = useState(false)
    const [refreshing, setRefreshing] = useState(false) 
    const [loading, setLoading] = useState(false)
    const [receiptInput, setReceiptInput] = useState<I_Receipt>({
        logo: 0,
        title: "",
        footer: "",
        note: "",
        promo: ""
    })
    const [receiptInputWarn, setReceiptInputWarn] = useState({
        title: "",
        footer: "",
        note: "",
        promo: ""
    })

    useEffect(() => {
        getReceiptData()
    },[])

    const getReceiptData = async () => {
        const result = await API_GetReceiptSetting(props.storeData.id)
        console.log("RESULT: ", result)
        if(result && result.meta.status === 'success') {
            setReceiptData(result.data)
            setReceiptInput(result.data)
        } else props.setUpAlert("Connection lost.", false)
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getReceiptData()
        setRefreshing(false)
    }

    const saveReceiptSetting = async () => {
        if (receiptInput.title === '') {
            setReceiptInputWarn((prev) => ({
                ...prev,
                title: "Title can not empty!"
            }))
            return
        } else {
            setReceiptInputWarn((prev) => ({
                ...prev,
                title: ""
            }))
        }

        if (receiptInput.footer === '') {
            setReceiptInputWarn((prev) => ({
                ...prev,
                footer: "Footer can not empty!"
            }))
            return
        }else {
            setReceiptInputWarn((prev) => ({
                ...prev,
                footer: ""
            }))
        }

        if (receiptInput.note === '') {
            setReceiptInputWarn((prev) => ({
                ...prev,
                note: "Note can not empty!"
            }))
            return
        } else {
            setReceiptInputWarn((prev) => ({
                ...prev,
                note: ""
            }))
        }

        setLoading(true)
        setTimeout(async () => {
            const payload: I_SetReceiptSettingRequest = {
                id: props.storeData.id,
                data: {
                    logo: require('@/assets/images/expresso.jpeg'),
                    title: receiptInput.title,
                    footer: receiptInput.footer,
                    note: receiptInput.note,
                    promo: receiptInput.promo
                }
            }

            const result = await API_SetReceiptSetting(payload)
            if(result && result.meta.status === 'success') {
                props.setUpAlert("Update receipt success!", true)
            } else props.setUpAlert("Connection lost.", false)
            setLoading(false)
        }, 2000)
    }
    
    return (
        <View>
            <CE_BackButton 
                lable={previewMode ? props.language.receipt.title.preview : props.language.receipt.title.receipt}
                onPress={() => {
                    if (previewMode) {
                        setPreviewMode(false)
                    } else {
                        props.handleBack()
                    }
                }}
            />
            {!previewMode ? (
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
                        <View className="flex flex-col gap-3">
                            <Input 
                                label={props.language.receipt.edit.title}
                                value={receiptInput.title}
                                multiline={true}
                                onChangeText={(text) => {
                                    setReceiptInput((prev) => ({
                                        ...prev,
                                        title: text
                                    }))                                
                                }}
                            />
                            {receiptInputWarn.title !== '' && (<Text className="text-sm text-danger font-semibold -mt-2">{receiptInputWarn.title}</Text>)}

                            <Input 
                                label={props.language.receipt.edit.footer}
                                value={receiptInput.footer}
                                multiline={true}
                                onChangeText={(text) => {
                                    setReceiptInput((prev) => ({
                                        ...prev,
                                        footer: text
                                    }))                                
                                }}
                            />
                            {receiptInputWarn.footer !== '' && (<Text className="text-sm text-danger font-semibold -mt-2">{receiptInputWarn.footer}</Text>)}

                            <Input 
                                label={props.language.receipt.edit.note}
                                value={receiptInput.note}
                                multiline={true}
                                onChangeText={(text) => {
                                    setReceiptInput((prev) => ({
                                        ...prev,
                                        note: text
                                    }))                                
                                }}
                            />
                            {receiptInputWarn.note !== '' && (<Text className="text-sm text-danger font-semibold -mt-2">{receiptInputWarn.note}</Text>)}

                            <Input 
                                label={props.language.receipt.edit.promo}
                                value={receiptInput.promo}
                                multiline={true}
                                numberOfLines={4}
                                optional={true}
                                onChangeText={(text) => {
                                    setReceiptInput((prev) => ({
                                        ...prev,
                                        promo: text
                                    }))                                
                                }}
                            />
                            <View className="flex flex-row gap-2">
                                <CE_Button 
                                    title={props.language.button.preview}
                                    onPress={() => setPreviewMode(true)}
                                    bgColor="bg-secondary"
                                />
                                <CE_Button 
                                    title={props.language.button.save}
                                    onPress={() => saveReceiptSetting()}
                                    isLoading={loading}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            ) : (
                <StorePreviewReceipt data={receiptInput} storeData={props.storeData}/>
            )}
        </View>
    )
}