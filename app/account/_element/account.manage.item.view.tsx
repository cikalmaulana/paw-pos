import { CE_BackButton } from "@/components/BackButton"
import { CE_Button } from "@/components/Button"
import { CE_ItemCardHorizontal } from "@/components/ItemCard"
import { API_GetAllItem } from "@/services/api/api.item.get"
import { I_Menu } from "@/services/api/api.item.get.int"
import { useEffect, useState } from "react"
import { Image, Modal, RefreshControl, ScrollView, Text, View } from "react-native"

interface I_Props{
    handleBack:()=>void
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
}

export default function ManageItemView(props: I_Props) {
    const [itemData, setItemData] = useState<I_Menu[] | null>(null)
    const [totalData, setTotalData] = useState(0)
    const [deletItemModalOpen, setDeleteItemModalOpen] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const getItemData = async () => {
        try{
            const result = await API_GetAllItem()
            if(result){
                if(result.meta.status !== 'success' || result.data == null ) {
                    props.setAlertMsg("Connection lost.")
                    props.setAlertSuccess(false)
                    props.setShowAlert(true)
                    return
                }

                setItemData(result.data)
                setTotalData(result.data.length)
            } else {
                props.setAlertMsg("Connection lost.")
                props.setAlertSuccess(false)
                props.setShowAlert(true)
                return
            }
        } catch(error) {
            console.error("Failed to get item data on Manage Item.")
            props.setAlertMsg("Connection lost.")
            props.setAlertSuccess(false)
            props.setShowAlert(true)
        }
    }

    useEffect(() => {
        getItemData()
    },[])

    const doDelete = (id: string) => {
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
            >
                <Text className="text-primary text-lg font-semibold mb-2">Total : {totalData} {totalData > 1 ? "items" : "item"}</Text>
                {itemData !== null && itemData.map((item, index) => {
                    return (
                        <View key={item.id} className="mb-4">
                            <CE_ItemCardHorizontal 
                                image={item.image}
                                price={item.price}
                                title={item.name}
                                deleteOnClick={() => setDeleteItemModalOpen(true)}
                                editOnClick={() => {}}
                                stock={item.stock}
                                key={item.id}
                            />
                            <Modal
                                visible={deletItemModalOpen}
                                transparent
                                animationType="fade"
                                onRequestClose={() => setDeleteItemModalOpen(false)}
                            >
                                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                                    <View className="bg-white p-6 rounded-2xl w-full max-w-md">
                                        
                                        <View className="items-center justify-center mb-4">
                                            <Image 
                                                source={require('@/assets/icons/warning.png')}
                                                style={{ width: 52, height: 52 }}
                                            />
                                        </View>

                                        <Text className="text-xl font-bold text-center text-primary mb-2">
                                            {item.name}
                                        </Text>

                                        <Text className="text-base text-center font-medium text-black mb-6">
                                            Are you sure you want to delete this item?
                                        </Text>

                                        <View className="flex-row gap-3">
                                            <CE_Button
                                                title="Delete"
                                                bgColor="bg-danger"
                                                onPress={() => doDelete(item.id)}
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
                                    </View>
                                </View>
                            </Modal>

                        </View>
                    )
                })}
            </ScrollView>   
        </View>
    )
}