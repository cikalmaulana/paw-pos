import { CE_BackButton } from "@/components/BackButton";
import { CE_Button } from "@/components/Button";
import { CE_Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { I_Store } from "@/services/api/store/api.store.int";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, RefreshControl, ScrollView, View } from "react-native";

interface I_Props{
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
            <CE_BackButton lable="Edit Store Detail" onPress={props.handleBack}/>
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
                            label="Store Name"
                            placeholder="Store Name"
                            value={inputName}
                            onChangeText={setInputName}
                        />
                        <Input 
                            label="Store Address"
                            placeholder="Store Address"
                            value={inputAddress}
                            onChangeText={setInputAddress}
                        />
                        <Input 
                            label="Store Phone"
                            placeholder="Store Phone"
                            value={inputPhone}
                            onChangeText={setInputPhone}
                        />
                        <CE_Dropdown
                            label="Store Type"
                            selected={
                                storeTypeList.find(opt => opt.value === inputStoreType)?.label ?? "-"
                            }
                            options={storeTypeList}
                            onSelect={(val) => setStoreType(val)}
                        />
                        <CE_Button 
                            title="Save"
                            onPress={doUpdateStoreDetail}
                            className="mt-3"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}