import { TAB_HEIGHT } from "@/app/(tabs)/constant";
import { CE_Button } from "@/components/Button";
import { CE_Card } from "@/components/Card";
import { CE_ItemCard } from "@/components/ItemCard";
import { CE_Search } from "@/components/Search";
import { I_Category } from "@/services/api/api.category.int";
import { I_GetMenuResponse } from "@/services/api/api.item.get.int";
import { I_Store } from "@/services/api/api.store.int";
import { I_User } from "@/services/api/api.user.get.int";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    View
} from "react-native";
import { searcHItemByCategory, searchItemByName } from "../_function/do.searchItem";

interface I_Props {
    userData: I_User
    storeData: I_Store
    itemData: I_GetMenuResponse | null
    categoryData: I_Category[] | null
}

export default function HomeMain(props: I_Props) {
    const [search, setSearch] = useState("");
    const [item, setItem] = useState<I_GetMenuResponse["data"]>(props.itemData?.data ?? []);
    const [selectedCategoryId, setSelectedCategoryId] = useState('')
    const [isLoading, setLoading] = useState(false)

    const categoryList = [{ id: '', name: 'All' }, ...(props.categoryData ?? [])];

    const filterItems = (categoryId: string, searchTerm: string) => {
        setLoading(true);
    
        setTimeout(() => {
            let result = props.itemData?.data ?? [];
    
            if (categoryId !== '') {
                result = searcHItemByCategory(categoryId, result);
            }
    
            if (searchTerm.trim() !== '') {
                result = searchItemByName(searchTerm, result);
            }
    
            setItem(result);
            setLoading(false);
        }, 300);
    };
    

    const selectItemByCategory = (id: string) => {
        const newCategoryId = id === selectedCategoryId ? '' : id
        setSelectedCategoryId(newCategoryId)
        filterItems(newCategoryId, search)
    }    

    useEffect(() => {
        const timeout = setTimeout(() => {
            filterItems(selectedCategoryId, search)
        }, 500);
    
        return () => clearTimeout(timeout)
    }, [search])

    return (
        <View className="min-h-screen">
            <View className="flex flex-row justify-between items-center mb-3 mx-5">
                <Text className="text-primary font-bold text-2xl">{props.userData.name}</Text>
                <Text className="text-secondary font-semibold text-lg">
                    {props.userData.id === props.storeData.owner_id ? "Owner" : "Cashier"}
                </Text>
            </View>

            <CE_Search
                value={search}
                onChangeText={(text) => setSearch(text)}
                className="mx-5 mb-2"
            />
            
            <View className="mt-2">
                {props.categoryData && (
                    <FlatList 
                        data={categoryList}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                        renderItem={({ item }) => (
                            <CE_Card 
                                onPress={() => selectItemByCategory(item.id)} 
                                className={`px-3 py-2 mr-2 mb-2 ${
                                    item.id === selectedCategoryId ? ' bg-primary ' : ' bg-white ' 
                                }`}>
                                <Text
                                    className={`${
                                        item.id === selectedCategoryId ? ' text-white ' : ' text-black ' 
                                    }`}
                                >
                                    {item.name}
                                </Text>
                            </CE_Card>
                        )}
                    />              
                )}
            </View>

            {isLoading ? (
                <View className="flex w-full items-center justify-center mt-12">
                    <ActivityIndicator size="large" color="#16B8A8" />
                    <Text>Loading data...</Text>
                </View>
            ) : 
                (item && item.length > 0) ? (
                    <FlatList
                        data={item}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{
                            paddingHorizontal: 20,
                            paddingBottom: TAB_HEIGHT + 210,
                        }}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        className="mt-2 min-h-screen"
                        renderItem={({ item }) => (
                            <View className="w-[48%] mb-4">
                                <CE_ItemCard
                                    image={item.image}
                                    title={item.name}
                                    price={item.price}
                                    description={item.description}
                                    buttonLabel="Add"
                                    onPressButton={() => console.log("Add clicked")}
                                />
                            </View>
                        )}
                    />
                ) : (
                    <View className="flex w-full justify-center items-center mt-10">
                        <Text className="mb-2 font-semibold text-lg">There is no item</Text>
                        {(props.userData.id === props.storeData.owner_id) && (
                            <CE_Button title="Add Item" className="w-2/3" />
                        )}
                    </View>
                )
            }
        </View>
    );
}
