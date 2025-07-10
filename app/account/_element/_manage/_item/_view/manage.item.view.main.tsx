import { CE_BackButton } from "@/components/BackButton"
import { CE_Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { CE_ItemCardHorizontal } from "@/components/ItemCard"
import { CE_Loading } from "@/components/Loading"
import { CE_Search } from "@/components/Search"
import { API_DeleteItem } from "@/services/api/api.item.delete"
import { API_EditItem } from "@/services/api/api.item.edit"
import { I_EditItemRequest } from "@/services/api/api.item.edit.int"
import { API_GetAllItem } from "@/services/api/api.item.get"
import { I_Menu } from "@/services/api/api.item.get.int"
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from "react"
import { Alert, Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, RefreshControl, ScrollView, Text, View } from "react-native"
import { searchItemByName } from "../../_function/do.searchItem"

interface I_Props{
    handleBack:()=>void
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
}

export default function ManageItemView(props: I_Props) {
    const { width, height } = Dimensions.get("window");
    
    const [search, setSearch] = useState("");
    const [itemData, setItemData] = useState<I_Menu[] | null>(null)
    const [totalData, setTotalData] = useState(0)
    const [deletItemModalOpen, setDeleteItemModalOpen] = useState(false)
    const [editItemModalOpen, setEditItemModalOpen] = useState(false)
    const [currentItemName, setCurrentItemName] = useState('')
    const [currentItemImg, setCurrentItemImg] = useState<number | string>('')
    const [currentItemPrice, setCurrentItemPrice] = useState('')
    const [currentItemDesc, setCurrentItemDesc] = useState('')
    const [selectedItem, setSelectedItem] = useState<I_Menu | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [filteredItems, setFilteredItems] = useState<I_Menu[]>([]);
    const [firstOpen, setFirstOpen] = useState(true)

    useEffect(() => {
        if(firstOpen) {
            setFirstOpen(false)
            return
        }
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
            setCurrentItemPrice(String(selectedItem.price))
            setCurrentItemDesc(selectedItem.description || '')
        }
    }, [selectedItem])

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.status !== 'granted') {
            alert('Permission to access camera is required!');
            return;
        }

        Alert.alert(
            "Change Image",
            "Select image source",
            [
                {
                    text: "Camera",
                    onPress: async () => {
                        const result = await ImagePicker.launchCameraAsync({
                        allowsEditing: true,
                        quality: 1,
                        });
            
                        if (!result.canceled) {
                            const asset = result.assets[0];
                            setCurrentItemImg(asset.uri);
                        }
                    },
                },
                {
                    text: "Gallery",
                    onPress: async () => {
                        const result = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        quality: 1,
                        });
            
                        if (!result.canceled) {
                        const asset = result.assets[0];
                        setCurrentItemImg(asset.uri);
                        }
                    },
                },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const getItemData = async () => {
        try{
            const result = await API_GetAllItem()
            if(result){
                if(result.meta.status !== 'success' || result.data == null ) {
                    alertSetup("Connection lost.", false)
                    return
                }

                setItemData(result.data)
                setFilteredItems(result.data);
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

    const doDelete = async (id: string) => {
        const result = await API_DeleteItem(id)
        if (result && result.meta.status === 'success'){
            alertSetup("Item deleted!", true)
        } else {
            alertSetup("Connection lost.", false)
        }
        await onRefresh()
        safetyClose()
    }

    const doEditItem = async (id: string) => {
        const payload: I_EditItemRequest = {
            id: id,
            name: currentItemName,
            image: typeof currentItemImg === 'number' ? currentItemImg : null,
            price: currentItemPrice,
            description: currentItemDesc
        }
        const result = await API_EditItem(payload)
        if (result && result.meta.status === 'success'){
            alertSetup("Update item success!", true)
        } else {
            alertSetup("Connection lost.", false)
        }
        await onRefresh()
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
        setCurrentItemImg('')
        setCurrentItemName('')
        setCurrentItemPrice('')
        setCurrentItemDesc('')
        setSelectedItem(null)

        setDeleteItemModalOpen(false)
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getItemData()
        setRefreshing(false)
    }

    return (
        <View>
            <CE_BackButton lable="View All Item" onPress={() => props.handleBack()}/>
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
                    contentContainerStyle={{ paddingBottom: 700 }}
                >
                    <Text className="text-primary text-lg font-semibold mb-2">Total : {totalData} {totalData > 1 ? "items" : "item"}</Text>
                    {filteredItems !== null && filteredItems.map((item, index) => {
                        return (
                            <View key={index} className="mb-4">
                                <CE_ItemCardHorizontal 
                                    image={item.image}
                                    price={item.price}
                                    title={item.name}
                                    deleteOnClick={() => {
                                        setSelectedItem(item)
                                        setDeleteItemModalOpen(true)
                                    }}
                                    editOnClick={() => {
                                        setSelectedItem(item)
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
                    visible={deletItemModalOpen}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setDeleteItemModalOpen(false)}
                >
                    <Pressable 
                        onPress={() => setDeleteItemModalOpen(false)} 
                        className="flex-1 bg-black/50 justify-center items-center px-6"
                    >
                        <Pressable 
                            onPress={(e) => e.stopPropagation()} 
                            className="bg-white p-6 rounded-2xl w-full max-w-md"
                        >
                            <View className="items-center justify-center mb-4">
                                <Image 
                                    source={require('@/assets/icons/warning.png')}
                                    style={{ width: 52, height: 52 }}
                                />
                            </View>
                
                            <Text className="text-xl font-bold text-center text-primary mb-2">
                                {selectedItem.name}
                            </Text>
                
                            <Text className="text-base text-center font-medium text-black mb-6">
                                Are you sure you want to delete this item?
                            </Text>
                
                            <View className="flex-row gap-3">
                                <CE_Button
                                    title="Delete"
                                    bgColor="bg-danger"
                                    onPress={() => doDelete(selectedItem.id)}
                                    className="flex-1 py-2"
                                    btnClassName="text-sm"
                                />
                                <CE_Button 
                                    title="Cancel" 
                                    onPress={() => setDeleteItemModalOpen(false)} 
                                    className="flex-1 py-2"
                                    btnClassName="text-sm"
                                />
                            </View>
                        </Pressable>
                    </Pressable>
                </Modal>
            
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
                                    <Text className="text-xl text-primary font-bold mb-4">Edit Item</Text>

                                    <View className="relative w-full h-56 mb-4">
                                        <Image
                                            source={typeof currentItemImg === 'string' ? { uri: currentItemImg } : currentItemImg}
                                            className="w-full h-full rounded-xl"
                                            resizeMode="cover"
                                        />
                                        <Pressable
                                            onPress={pickImage}
                                            className="absolute inset-0 items-center justify-center"
                                        >
                                            <Text className="text-secondary border border-secondary px-3 py-1 rounded-full bg-white/60 text-lg">
                                                Change Image
                                            </Text>
                                        </Pressable>
                                    </View>

                                    <View className="flex flex-col gap-4 mb-4">
                                        <Input
                                            label="Name"
                                            placeholder="Item Name"
                                            value={currentItemName}
                                            onChangeText={setCurrentItemName}
                                        />

                                        <Input
                                            label="Price"
                                            placeholder="Price"
                                            keyboardType="numeric"
                                            value={currentItemPrice}
                                            onChangeText={setCurrentItemPrice}
                                        />

                                        <Input
                                            label="Description"
                                            placeholder="Description"
                                            multiline
                                            numberOfLines={3}
                                            value={currentItemDesc}
                                            onChangeText={setCurrentItemDesc}
                                        />
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
                                        onPress={() => doEditItem(selectedItem.id)}
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