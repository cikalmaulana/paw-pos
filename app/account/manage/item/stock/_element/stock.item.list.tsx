import { CE_ItemCardHorizontal } from "@/components/ItemCard"
import { I_Menu } from "@/services/api/api.item.get.int"
import { RefreshControl, ScrollView, Text, View } from "react-native"

interface I_Props{
    refreshing: boolean
    totalData: number
    filteredItems: I_Menu[]
    onRefresh:()=>void
    setSelectedItem:(item: I_Menu)=>void
    setEditStockState: React.Dispatch<React.SetStateAction<{
        editItemModalOpen: boolean
        currentItemImg: string | number
        currentItemName: string
        currentStock: string
        stockWarn: string
    }>>
}

export default function StockItemList(props: I_Props) {
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
                            price={item.price}
                            title={item.name}
                            editLabel="Edit Stock"
                            editOnClick={() => {
                                props.setSelectedItem(item)
                                props.setEditStockState(prev => ({
                                    ...prev,
                                    currentStock: item.stock.toString(),
                                    editItemModalOpen: true,
                                }))
                            }}                                    
                            stock={item.stock}
                        />
                    </View>
                )
            })}
        </ScrollView>  
    )
}