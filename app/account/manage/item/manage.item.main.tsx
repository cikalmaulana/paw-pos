import { CE_BackButton } from "@/components/BackButton";
import { CE_Card } from "@/components/Card";
import { CE_Loading } from "@/components/Loading";
import { API_GetTotalItem } from "@/services/api/item/api.item.get";
import { I_Lang } from "@/services/api/other/api.language.int";
import { I_Store } from "@/services/api/store/api.store.int";
import { useLocale } from "@/services/function/useLocale";
import { lazy, Suspense, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { ManageItemList } from "./_element/manage.item.list";
import AddNewItem from "./add/item.add.main";
import { locales } from "./locales";

const ManageItemView = lazy(() => import("./view/view.main"));
const ManageItemEditStock = lazy(() => import("./stock/stock.main"))
const ManageItemCategories = lazy(() => import("./category/category.main"))

interface I_Props {
    lang: I_Lang
    handleBack:()=>void
    storeData: I_Store
    setupAlert:(msg: string, isSuccess: boolean)=>void
}

export default function ManageItem(props: I_Props){
    const language = useLocale(props.lang, locales);
    
    const itemList = [
        { key: 'viewItem', label: language.list.view, image:require("@/assets/icons/viewItem.png") },
        { key: 'addItem', label: language.list.add, image:require("@/assets/icons/addItem.png") },
        { key: 'editStock', label: language.list.edit, image:require("@/assets/icons/editStock.png")  },
        { key: 'categories', label: language.list.categories, image:require("@/assets/icons/categories.png")  }
    ]

    const [manageItemOpen, setManageItemOpen] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [totalItem, setTotalItem] = useState(0)

    const onRefresh = async() => {
        setRefreshing(true)
        await getTotalItem()
        setRefreshing(false)
    }

    const getTotalItem = async () => {
        const result = await API_GetTotalItem()
        if(result && result.meta.status === 'success') {
            setTotalItem(result.totalItem)
        } else {
            props.setupAlert("Connection error.", false)
        }
    }

    useEffect(() => {
        onRefresh()
    },[])

    return (
        <View>

            {manageItemOpen === '' ? (
                <>
                    <CE_BackButton lable={language.title} onPress={props.handleBack}/>
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
                        contentContainerStyle={{ paddingBottom: 500 }}
                    >
                        <View className="flex flex-row gap-4 w-full mb-8 px-2">
                            <CE_Card className="bg-primary p-5 flex justify-center flex-1" onPress={() => setManageItemOpen('viewItem')}>
                                <Text className="text-white font-semibold text-lg">Total Item</Text>
                                <Text className="text-white font-semibold text-3xl">{totalItem}</Text>
                            </CE_Card>
                            <CE_Card className="bg-white p-5 flex justify-center flex-1" onPress={() => setManageItemOpen('editStock')}>
                                <Text className="text-primary font-semibold text-lg">Total Low Stock</Text>
                                <Text className="text-primary font-semibold text-3xl">4</Text>
                            </CE_Card>
                        </View>

                        <ManageItemList setManageItemOpen={setManageItemOpen} manageItemList={itemList} title={language.list.title}/>
                    </ScrollView>
                </>
            ) : manageItemOpen === 'viewItem' ? (
                <Suspense fallback={
                    <CE_Loading />
                }>
                    <ManageItemView 
                        language={language}
                        handleBack={() => setManageItemOpen('')}
                        setupAlert={(msg, isSuccess) => props.setupAlert(msg, isSuccess)}
                    />
                </Suspense>
            ) : manageItemOpen === 'addItem' ? (
                <AddNewItem 
                    language={language}
                    hahandleBack={() => setManageItemOpen('')}
                    setupAlert={(msg, isSuccess) => props.setupAlert(msg, isSuccess)}
                />
            ) : manageItemOpen === 'editStock' ? (
                <Suspense fallback={
                    <CE_Loading />
                }>
                    <ManageItemEditStock 
                        language={language}
                        handleBack={() => setManageItemOpen('')}
                        setupAlert={(msg, isSuccess) => props.setupAlert(msg, isSuccess)}
                    />
                </Suspense>
            ) : manageItemOpen === 'categories' && (
                <Suspense fallback={
                    <CE_Loading />
                }>
                    <ManageItemCategories 
                        language={language}
                        handleBack={() => setManageItemOpen('')}
                        setupAlert={(msg, isSuccess) => props.setupAlert(msg, isSuccess)}
                    />
                </Suspense>
            )}
        </View>
    )
}