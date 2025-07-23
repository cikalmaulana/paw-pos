import { CE_BackButton } from "@/components/BackButton";
import { CE_Button } from "@/components/Button";
import { CE_Card } from "@/components/Card";
import { I_Lang } from "@/services/api/other/api.language.int";
import { API_GetStoreAdmin } from "@/services/api/store/api.store.get";
import { I_User } from "@/services/api/user/api.user.get.int";
import { useLocale } from "@/services/function/useLocale";
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import AddAdmin from "./_element/manage.admin.add";
import ViewAdminDelete from "./_element/manage.admin.delete";
import { locales } from "./locales";

interface I_Props {
    lang: I_Lang
    storeId: string
    handleBack:()=>void
    setUpAlert:(msg: string, isSuccess: boolean)=>void
}

export default function ManageAdmin(props: I_Props){
    const language = useLocale(props.lang, locales)
    
    const [adminList, setAdminList] = useState<I_User[]>([])
    const [deleteAdminOpen, setDeleteAdminOpen] = useState(false)
    const [adminOnSelect, setAdminOnSelect] = useState<I_User | undefined>()
    const [addAdminModalOpen, setAddAdminModalOpen] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getAdminList()
    },[])

    const getAdminList = async () => {
        const result = await API_GetStoreAdmin(props.storeId)
        if(result && result.meta.status === 'success'){
            setAdminList(result.data)
        } else {
            props.setUpAlert("Connection lost.", false)
            props.handleBack()
        }
    }

    const openDelete = (admin: I_User) => {
        setDeleteAdminOpen(true)
        setAdminOnSelect(admin)
    }

    const doDeleteAdmin = async (id: string) => {
        setDeleteAdminOpen(false)
        await getAdminList()
    }

    const doAddAdmin = async (phone: string) => {
        setAddAdminModalOpen(false)
        await getAdminList()
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getAdminList()
        setRefreshing(false)
    }

    return (
        <View>
            <CE_BackButton lable={language.title} onPress={props.handleBack}/>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80}
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
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    keyboardShouldPersistTaps="handled"
                    className="min-h-screen"
                >
                    <CE_Button title={language.button.add} onPress={() => setAddAdminModalOpen(true)}/>

                    <CE_Card className="bg-white !shadow-none p-3 mt-5">
                        <View className="flex flex-col">
                            {adminList.map((item, index) => {
                                const isLast = index === adminList.length - 1;
                                return (
                                    <View
                                        key={index}
                                        className={`flex flex-row items-center justify-between py-3 ${
                                            !isLast ? "border-b border-b-gray-200" : ""
                                        }`}
                                    >
                                        <View className="flex flex-row items-center gap-3">
                                            <Image
                                                source={require("@/assets/icons/addItem.png")}
                                                style={{ width: 18, height: 18 }}
                                            />
                                            <Text className="text-primary font-semibold text-lg">
                                                {item.name}
                                            </Text>
                                        </View>
                                        <Pressable onPress={() => openDelete(item)}>
                                            <Image
                                                source={require("@/assets/icons/delete.png")}
                                                style={{ width: 18, height: 18 }}
                                            />
                                        </Pressable>
                                    </View>
                                )
                            })}
                        </View>
                    </CE_Card>
                </ScrollView> 
            </KeyboardAvoidingView>

            {deleteAdminOpen && (
                <ViewAdminDelete 
                    language={language}
                    adminData={adminOnSelect} 
                    isOpen={deleteAdminOpen} 
                    setIsOpen={(open) => setDeleteAdminOpen(open)}
                    deleteAdmin={(id) => doDeleteAdmin(id)}
                />
            )}

            {addAdminModalOpen && (
                <AddAdmin 
                    language={language}
                    isOpen={addAdminModalOpen}
                    setIsOpen={setAddAdminModalOpen}
                />
            )}
        </View>
    )
}