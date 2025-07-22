import { CE_ItemCardHorizontal } from "@/components/ItemCard"
import { I_Menu } from "@/services/api/item/api.item.get.int"
import { RefreshControl, ScrollView, Text, View } from "react-native"

interface I_Props{
    refreshing: boolean
    filteredItems: I_Menu[]
    totalData: number
    onRefresh:()=>void
    setSelectedItem:(item: I_Menu)=>void
    setOpenModal: React.Dispatch<React.SetStateAction<{
        editItem: boolean,
        deleteItem: boolean
    }>>
}

export default function ItemList(props: I_Props){
    return (
        <ScrollView 
            className="min-h-screen"
            refreshControl={
                <RefreshControl
                    refreshing={props.refreshing}
                    onRefresh={props.onRefresh}
                    colors={["#16B8A8"]}       
                    tintColor="#16B8A8"        
                    title="Loading..."         
                    titleColor="#16B8A8"        
                />
            }
            contentContainerStyle={{ paddingBottom: 700 }}
            showsVerticalScrollIndicator={false}
        >
            <Text className="text-primary text-lg font-semibold mb-2">Total : {props.totalData} {props.totalData > 1 ? "items" : "item"}</Text>
            {props.filteredItems !== null && props.filteredItems.map((item, index) => {
                return (
                    <View key={index} className="mb-4">
                        <CE_ItemCardHorizontal 
                            image={item.image}
                            price={item.selling_price}
                            title={item.name}
                            deleteOnClick={() => {
                                props.setSelectedItem(item)
                                props.setOpenModal(prev => ({ ...prev, deleteItem: true }))
                            }}
                            editOnClick={() => {
                                props.setSelectedItem(item)
                                props.setOpenModal(prev => ({ ...prev, editItem: true }))
                            }}
                            stock={item.stock ?? 0}
                        />
                    </View>
                )
            })}
        </ScrollView> 
    )
}