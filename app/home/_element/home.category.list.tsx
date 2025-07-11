import { CE_Card } from "@/components/Card";
import { I_Category } from "@/services/api/category/api.category.get.int";
import { FlatList, Text, View } from "react-native";
interface I_Props{
    categoryData: I_Category[] | null
    categoryList: I_Category[]
    selectedCategoryId: string
    selectItemByCategory:(id: string) => void
}

export default function HomeCatgeoryList(props: I_Props){
    return (
        <View className="mt-2">
            {props.categoryData && (
                <FlatList 
                    data={props.categoryList}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    renderItem={({ item }) => (
                        <CE_Card 
                            onPress={() => props.selectItemByCategory(item.id)} 
                            className={`px-3 py-2 mr-2 mb-2 ${
                                item.id === props.selectedCategoryId ? ' bg-primary ' : ' bg-white ' 
                            }`}>
                            <Text
                                className={`${
                                    item.id === props.selectedCategoryId ? ' text-white ' : ' text-black ' 
                                }`}
                            >
                                {item.name}
                            </Text>
                        </CE_Card>
                    )}
                />              
            )}
        </View>
    )
}