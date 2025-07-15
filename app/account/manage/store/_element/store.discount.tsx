import { CE_BackButton } from "@/components/BackButton"
import { CE_Button } from "@/components/Button"
import { CE_Dropdown } from "@/components/Dropdown"
import { Input } from "@/components/Input"
import { API_GetStoreById } from "@/services/api/store/api.store.get"
import { I_Store } from "@/services/api/store/api.store.int"
import { API_UpdateDiscountSetting } from "@/services/api/store/api.store.set"
import { I_UpdateDiscountRequest } from "@/services/api/store/api.store.set.int"
import { useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, Pressable, RefreshControl, ScrollView, Switch, Text, View } from "react-native"

interface I_Props{
    storeData: I_Store
    refreshing: boolean
    handleBack:()=>void
    setStoreData:(data: I_Store)=>void
    setUpAlert:(msg: string, isSuccess: boolean)=>void
    doRefresh:()=>void
}

export default function StoreDiscount(props: I_Props) {
    const [isDiscountActive, setDiscountActive] = useState(props.storeData.setting.discount.is_active)
    const [discountType, setDiscountType] = useState(props.storeData.setting.discount.type)
    const [discountName, setDiscountName] = useState(props.storeData.setting.discount.name)
    const [discountMinimal, setDiscountMinimal] = useState(props.storeData.setting.discount.min_order)
    const [discountNominal, setDiscountNominal] = useState(props.storeData.setting.discount.value)
    const [discountDescription, setDiscountDescription] = useState(props.storeData.setting.discount.description)
    const [hint, setHint] = useState("Dalam Persen")
    const [firstLoad, setFirstLoad] = useState(true)

    const discountTypeList = [
        { value: 'percentage', label: 'Percentage' },
        { value: 'fixed', label: 'Fixed' },
    ] 

    useEffect(() => {
        if(firstLoad) {
            setFirstLoad(false)
            true
        }

        if(discountType === "percentage") setHint("Dalam Persen. Hanya mengisi angka, Contoh: 10 untuk 10%")
        else setHint("Dalam Rupiah. Hanya mengisi angka, Contoh: 20000 untuk Rp20.000")
    },[discountType])

    const saveDiscount = async () => {
        const payload: I_UpdateDiscountRequest = {
            store_id:props.storeData.id,
            data: {
                is_active: isDiscountActive,           
                value: discountNominal,               
                type: discountType,
                name: discountName,                
                min_order: discountMinimal,       
                description: discountDescription
            }
        }
        const result = await API_UpdateDiscountSetting(payload)
        if(result && result.meta.status === 'success'){
            props.setUpAlert("Update discount success!", true)
            await doRefresh()
        } else props.setUpAlert("Connection lost.", false)
    }

    const doRefresh = async () => {
        const result = await API_GetStoreById(props.storeData.id)
        if(result && result.meta.status === 'success'){
            props.setStoreData(result.data)
        } else props.setUpAlert("Connection lost.", false)
    }
    
    return (
        <View>
            <CE_BackButton lable="Discount Setting" onPress={props.handleBack}/>
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
                        <Pressable
                            className={`flex flex-row items-center justify-between py-3 border-b border-b-gray-200`}
                        >
                            <View className="flex flex-row items-center gap-3">
                                <Text className="text-primary font-semibold text-lg">Is Discount Active?</Text>
                            </View>
                            <Switch
                                value={isDiscountActive}
                                onValueChange={() => setDiscountActive(!isDiscountActive)}
                                thumbColor={isDiscountActive ? "#10b981" : "#f4f3f4"}
                                trackColor={{ false: "#ccc", true: "#a7f3d0" }}
                            />
                        </Pressable>

                        <Input 
                            label="Discount Name"
                            value={discountName}
                            onChangeText={setDiscountName}
                            disabled={!isDiscountActive}
                        />

                        <CE_Dropdown
                            label="Discount Type"
                            selected={
                                discountTypeList.find(opt => opt.value === discountType)?.label ?? "-"
                            }
                            options={discountTypeList}
                            onSelect={(val) => {
                                if (val === "percentage" || val === "fixed") {
                                    setDiscountType(val)
                                }
                            }}
                            disabled={!isDiscountActive}
                        />
                        
                        <Input 
                            label="Value"
                            keyboardType="numeric"
                            value={discountNominal?.toString()}
                            onChangeText={(e) => setDiscountNominal(Number(e))}
                            disabled={!isDiscountActive}
                            hint={hint}
                        />

                        <Input 
                            label="Min Order"
                            value={discountMinimal?.toString()}
                            onChangeText={(e) => setDiscountMinimal(Number(e))}
                            disabled={!isDiscountActive}
                            hint="Dalam rupiah. Hanya mengisi angka, Contoh 20000 untuk Rp20.000"
                        />

                        <Input 
                            label="Description"
                            optional={true}
                            value={discountDescription}
                            onChangeText={(e) => setDiscountDescription(e)}
                            disabled={!isDiscountActive}
                        />

                        <CE_Button 
                            title="Save"
                            onPress={saveDiscount}
                        />

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}