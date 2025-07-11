import { CE_ItemCardHorizontal } from "@/components/ItemCard"
import { I_Menu } from "@/services/api/item/api.item.get.int"
import { useState } from "react"
import { Image, Pressable, RefreshControl, ScrollView, Text, View } from "react-native"

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
    const [sortBy, setSortBy] = useState<"default" | "asc" | "desc">("default")

    const sortedItems = [...props.filteredItems]
    if (sortBy === "asc") sortedItems.sort((a, b) => a.stock - b.stock)
    else if (sortBy === "desc") sortedItems.sort((a, b) => b.stock - a.stock)

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
            <View className="flex flex-row justify-between items-center mb-2">
                <Text className="text-primary text-lg font-semibold">
                    Total : {props.totalData} {props.totalData > 1 ? "items" : "item"}
                </Text>

                <Pressable 
                    className="flex flex-row items-center"
                    onPress={() => {
                        setSortBy(prev => {
                            if (prev === "default") return "asc"
                            if (prev === "asc") return "desc"
                            return "default"
                        })
                    }}
                >
                    <Text className="text-primary font-semibold text-lg"> Sort </Text>
                    {sortBy === "default" ? (
                        <Image 
                            source={require("@/assets/icons/sort.png")}
                            style={{width:18, height:18}}
                        />
                    ) : sortBy === "asc" ? (
                        <Image 
                            source={require("@/assets/icons/asc.png")}
                            style={{width:18, height:18}}
                        />
                    ) : (
                        <Image 
                            source={require("@/assets/icons/desc.png")}
                            style={{width:18, height:18}}
                        />
                    )}
                </Pressable>
            </View>

            {props.filteredItems !== null && sortedItems !== null && sortedItems.map((item, index) => {
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