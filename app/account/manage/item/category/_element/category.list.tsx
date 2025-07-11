import { CE_Card } from "@/components/Card";
import { I_Category } from "@/services/api/category/api.category.get.int";
import { Image, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";

interface I_Props{
    refreshing: boolean
    filteredCategory: I_Category[]
    setSelectedCategory:(category: I_Category)=>void
    setEditCategory: React.Dispatch<React.SetStateAction<{
        currentCategoryName: string
        currentCategoryNameWarn: string
        editCategoryOpen: boolean
    }>>
    onRefresh:()=>void
}

export default function CategoryList(props: I_Props){
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
        >
                
            <Text className="text-primary font-bold text-xl mb-3">Category List</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col">
                    {props.filteredCategory && props.filteredCategory.map((item, index) => {
                        const isLast = index === props.filteredCategory.length - 1;
                        return (
                            <View key={item.id}>
                                <Pressable
                                    className={`flex flex-row items-center justify-between py-3 ${
                                        !isLast ? "border-b border-b-gray-200" : ""
                                    }`}
                                    onPress={() => {
                                        props.setSelectedCategory(item)
                                        props.setEditCategory(prev => ({
                                            ...prev,
                                            currentCategoryName: item.name,
                                            editCategoryOpen: true 
                                        }))
                                    }}
                                    
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
    )
}