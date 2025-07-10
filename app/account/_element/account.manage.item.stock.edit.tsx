import { CE_BackButton } from "@/components/BackButton";
import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { CE_ItemCardHorizontal } from "@/components/ItemCard";
import { CE_Loading } from "@/components/Loading";
import { CE_Search } from "@/components/Search";
import { API_EditStock } from "@/services/api/api.item.edit";
import { I_EditStockRequest } from "@/services/api/api.item.edit.int";
import { API_GetAllItem } from "@/services/api/api.item.get";
import { I_Menu } from "@/services/api/api.item.get.int";
import { useEffect, useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { searchItemByName } from "../_function/do.searchItem";

interface I_Props{
    handleBack:()=>void
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
}

export default function ManageItemEditStock(props: I_Props) {
    const { width, height } = Dimensions.get("window");
    
    const [search, setSearch] = useState("");
    const [itemData, setItemData] = useState<I_Menu[] | null>(null)
    const [selectedItem, setSelectedItem] = useState<I_Menu | null>(null)
    const [currentItemImg, setCurrentItemImg] = useState<number | string>('')
    const [currentItemName, setCurrentItemName] = useState('')
    const [editItemModalOpen, setEditItemModalOpen] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [totalData, setTotalData] = useState(0)
    const [currentStock, setCurrentStock] = useState('')
    const [stockWarn, setStockWarn] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [filteredItems, setFilteredItems] = useState<I_Menu[]>([]);


    useEffect(() => {
        const timeout = setTimeout(() => {
            filterItems(search)
        }, 500);
    
        return () => clearTimeout(timeout)
    }, [search])

    const filterItems = (searchTerm: string) => {
        setLoading(true);
    
        setTimeout(() => {
            let result = itemData ?? [];
    
            if (searchTerm.trim() !== '') {
                result = searchItemByName(searchTerm, result);
            }
    
            setFilteredItems(result);
            setTotalData(result.length)
            setLoading(false);
        }, 300);
    };

    useEffect(() => {
        if (selectedItem) {
            setCurrentItemName(selectedItem.name)
            setCurrentItemImg(selectedItem.image)
        }
    }, [selectedItem])

    const getItemData = async () => {
        try{
            const result = await API_GetAllItem()
            if(result){
                if(result.meta.status !== 'success' || result.data == null ) {
                    alertSetup("Connection lost.", false)
                    return
                }

                setItemData(result.data)
                setFilteredItems(result.data)
                setTotalData(result.data.length)
            } else {
                alertSetup("Connection lost.", false)
                return
            }
        } catch(error) {
            console.error("Failed to get item data on Manage Item.")
            alertSetup("Connection lost.", false)
        }
    }

    useEffect(() => {
        getItemData()
    },[])
    
    const onRefresh = async () => {
        setRefreshing(true)
        await getItemData()
        setRefreshing(false)
    }

    const saveEditStock = async (id: string) => {
        if(currentStock === '') {
            setStockWarn('Stock can not empty!')
            return
        } else {
            setStockWarn('')
        }

        const newStock = parseInt(currentStock.trim())

        const payload: I_EditStockRequest = {
            id: id,
            stock: newStock
        }

        const result = await API_EditStock(payload)
        if(result && result.meta.status === 'success'){
            alertSetup("Edit stock success!", true)
        } else {
            alertSetup("Connection lost.", false)
        }
        
        onRefresh()
        safetyClose()
    }

    const alertSetup = (msg: string, isSuccess: boolean) => {
        props.setAlertMsg(msg)
        props.setAlertSuccess(isSuccess)
        props.setShowAlert(true)
    }

    const cancelEdit = async () => {
        safetyClose()
    }

    const safetyClose = () => {
        setEditItemModalOpen(false)
        setCurrentStock('')
        setSelectedItem(null)
    }

    return (
        <View>
            <CE_BackButton lable="Edit Stock" onPress={() => props.handleBack()}/>
            <View className="flex flex-row items-center mb-4 gap-4">
                <View className="flex-1">
                    <CE_Search
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
            </View>

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
                    contentContainerStyle={{ paddingBottom: 500 }}
                >
                    <Text className="text-primary text-lg font-semibold mb-2">Total : {totalData} {totalData > 1 ? "items" : "item"}</Text>
                    {filteredItems !== null && filteredItems.map((item, index) => {
                        return (
                            <View key={index} className="mb-4">
                                <CE_ItemCardHorizontal 
                                    image={item.image}
                                    price={item.price}
                                    title={item.name}
                                    editLabel="Edit Stock"
                                    editOnClick={() => {
                                        setSelectedItem(item)
                                        setCurrentStock(item.stock.toString())
                                        setEditItemModalOpen(true)
                                    }}
                                    stock={item.stock}
                                />
                            </View>
                        )
                    })}
                </ScrollView>   
            )}

            {selectedItem && (
                <Modal
                    visible={editItemModalOpen}
                    transparent
                    animationType="fade"
                    onRequestClose={cancelEdit}
                >
                    <Pressable onPress={cancelEdit} className="flex-1 bg-black/50 justify-center items-center px-6">
                        <Pressable
                            onPress={(e) => e.stopPropagation()}
                            style={{ maxHeight: height * 0.8, width: width * 0.9 }}
                            className="bg-white rounded-2xl p-4 w-full"
                        >
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                keyboardVerticalOffset={80}
                            >
                                <ScrollView
                                    contentContainerStyle={{ paddingBottom: 16 }}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    <Text className="text-xl text-primary font-bold mb-4">Edit Stock</Text>

                                    <View className="relative w-full h-56 mb-4">
                                        <Image
                                            source={typeof currentItemImg === 'string' ? { uri: currentItemImg } : currentItemImg}
                                            className="w-full h-full rounded-xl"
                                            resizeMode="cover"
                                        />
                                    </View>

                                    <View className="flex flex-col justify-center gap-4 mb-4">
                                        <Text className="text-primary font-bold text-xl">{currentItemName}</Text>
                                        <Input
                                            label="Stock"
                                            keyboardType="numeric"
                                            placeholder="Stock"
                                            type="number" 
                                            stepperButtons 
                                            value={currentStock}
                                            onChangeText={setCurrentStock}
                                        />
                                        {stockWarn !== '' && (<Text className="text-danger -mt-3">{stockWarn}</Text>)}
                                    </View>
                                </ScrollView>

                                <View className="flex-row gap-3 mt-4">
                                    <CE_Button
                                        title="Cancel"
                                        bgColor="bg-primary"
                                        onPress={cancelEdit}
                                        className="flex-1 py-2"
                                        btnClassName="text-sm"
                                    />
                                    <CE_Button
                                        title="Save"
                                        onPress={() => saveEditStock(selectedItem.id)}
                                        className="flex-1 py-2"
                                        btnClassName="text-sm"
                                        bgColor="bg-secondary"
                                    />
                                </View>
                            </KeyboardAvoidingView>
                        </Pressable>
                    </Pressable>
                </Modal>
            )}
        </View> 
    )
}