import { CE_BackButton } from "@/components/BackButton";
import { CE_Button } from "@/components/Button";
import { CE_Card } from "@/components/Card";
import { CE_Loading } from "@/components/Loading";
import { CE_Search } from "@/components/Search";
import { API_GetAllCategory } from "@/services/api/api.category";
import { I_Category } from "@/services/api/api.category.int";
import { useEffect, useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { searchCategoryByName } from "../_function/do.searchItem";

interface I_Props{
    handleBack:()=>void
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
}

export default function ManageItemCategories(props: I_Props){
    const [categories, setCategories] = useState<I_Category[] | undefined>()
    const [filteredItems, setFilteredItems] = useState<I_Category[]>([])
    const [isLoading, setLoading] = useState(false)
    const [search, setSearch] = useState("");
    const [firstOpen, setFirstOpen] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if(firstOpen) {
            setFirstOpen(false)
            return
        }

        const timeout = setTimeout(() => {
            filterCategory(search)
        }, 500);
    
        return () => clearTimeout(timeout)
    }, [search])

    const filterCategory = (searchTerm: string) => {
        setLoading(true);
    
        setTimeout(() => {
            let result = categories ?? [];
    
            if (searchTerm.trim() !== '') {
                result = searchCategoryByName(searchTerm, result);
            }
    
            setFilteredItems(result);
            setLoading(false);
        }, 300);
    };

    useEffect(() => {
        getAllCategory()
    },[])

    const onRefresh = async () => {
        setRefreshing(true)
        await getAllCategory()
        setRefreshing(false)
    }

    const getAllCategory = async () => {
        const result = await API_GetAllCategory()
        console.log("RESULT: ", result)
        if(result && result.meta.status === 'success'){
            if(result.data === null) {
                alertSetup(result.meta.message, false)
                return
            }

            setCategories(result.data)
            setFilteredItems(result.data)
        } else alertSetup("Connection lost.", false)
    }

    const alertSetup = (msg: string, isSuccess: boolean) => {
        props.setAlertMsg(msg)
        props.setAlertSuccess(isSuccess)
        props.setShowAlert(true)
    }

    return (
        <View>
            <CE_BackButton lable="Manage Categories" onPress={() => props.handleBack()}/>
            <View className="flex flex-row items-center mb-4 gap-4">
                <View className="flex-1">
                    <CE_Search
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
            </View>

            <CE_Button title="Add New Category" className="mb-3" onPress={() => {}}/>

            {isLoading ? <CE_Loading /> : (
                <ScrollView 
                    className="min-h-screen"
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
                >
                        
                    <Text className="text-primary font-bold text-xl mb-3">Category List</Text>
                    <CE_Card className="bg-white !shadow-none p-3">
                        <View className="flex flex-col">
                            {filteredItems && filteredItems.map((item, index) => {
                                const isLast = index === filteredItems.length - 1;
                                return (
                                    <View key={item.id}>
                                        <Pressable
                                            className={`flex flex-row items-center justify-between py-3 ${
                                                !isLast ? "border-b border-b-gray-200" : ""
                                            }`}
                                            onPress={() => {}}
                                        >
                                            <View className="flex flex-row items-center gap-3">
                                                <Text className="text-primary font-semibold text-lg">
                                                    {item.name}
                                                </Text>
                                            </View>
                                            <Image
                                                source={require("@/assets/icons/right-arrow.png")}
                                                style={{ width: 14, height: 14 }}
                                            />
                                        </Pressable>
                                    </View>
                                )
                            })}
                        </View>
                    </CE_Card>
                </ScrollView>
            )}

        </View> 
    )
}