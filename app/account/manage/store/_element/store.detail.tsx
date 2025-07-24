import { CE_BackButton } from "@/components/BackButton";
import { CE_Button } from "@/components/Button";
import { CE_Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { I_Store } from "@/services/api/store/api.store.int";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, RefreshControl, ScrollView, View } from "react-native";
import { locales } from "../locales";

interface I_Props{
    language: typeof locales["id"]
    storeData: I_Store
    refreshing: boolean
    handleBack:()=>void
    setStoreData:(data: I_Store)=>void
    setUpAlert:(msg: string, isSuccess: boolean)=>void
    doRefresh:()=>void
}

export default function StoreDetail(props: I_Props) {
    const [inputName, setInputName] = useState(props.storeData.name)
    const [inputAddress, setInputAddress] = useState(props.storeData.address)
    const [inputPhone, setInputPhone] = useState(props.storeData.phone ?? '')
    const [inputStoreType, setStoreType] = useState(props.storeData.setting.store_type)

    const storeTypeList = [
        { value: 'grocery', label: 'Grocery' },
        { value: 'restaurant', label: 'Restaurant' },
    ] 

    const doUpdateStoreDetail = () => {
        // do api thing
        // if success:
        props.setUpAlert("Update store detail success!", true)
        props.doRefresh()
    }

    return (
        <View>
            <CE_BackButton lable={props.language.detail.title} onPress={props.handleBack}/>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                keyboardVerticalOffset={100}
            >
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={props.refreshing}
                            onRefresh={props.doRefresh}
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
                            label={props.language.detail.name}
                            placeholder={props.language.detail.name}
                            value={inputName}
                            onChangeText={setInputName}
                        />
                        <Input 
                            label={props.language.detail.address}
                            placeholder={props.language.detail.address}
                            value={inputAddress}
                            onChangeText={setInputAddress}
                        />
                        <Input 
                            label={props.language.detail.phone}
                            placeholder={props.language.detail.phone}
                            value={inputPhone}
                            onChangeText={setInputPhone}
                        />
                        <CE_Dropdown
                            label={props.language.detail.type}
                            selected={
                                storeTypeList.find(opt => opt.value === inputStoreType)?.label ?? "-"
                            }
                            options={storeTypeList}
                            onSelect={(val) => setStoreType(val)}
                        />
                        <CE_Button 
                            title={props.language.button.save}
                            onPress={doUpdateStoreDetail}
                            className="mt-3"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}