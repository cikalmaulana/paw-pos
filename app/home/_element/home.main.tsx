import { CE_ItemCard } from "@/components/ItemCard";
import { CE_Search } from "@/components/Search";
import { I_GetMenuResponse } from "@/services/api/api.item.get.int";
import { I_Store } from "@/services/api/api.store.int";
import { I_User } from "@/services/api/api.user.get.int";
import { useState } from "react";
import { Keyboard, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";

interface I_Props{
    userData: I_User
    storeData: I_Store
    itemData: I_GetMenuResponse | null
}

export function HomeMain(props: I_Props){
    const [search, setSearch] = useState('')
    const [item, setItem] = useState<I_GetMenuResponse | null>(props.itemData)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1">
                <CE_Search
                    value={search}
                    onChangeText={setSearch}
                    className="mx-5 mb-2"
                />
                <ScrollView className="min-h-screen"> 
                    {(item && item.data) ? (
                            <View className="flex flex-row flex-wrap justify-between px-5">
                                {item.data.map((item) => (
                                    <View key={item.id} className="w-[48%] mb-4">
                                        <CE_ItemCard
                                            image={item.image}
                                            title={item.name}
                                            price={item.price}
                                            description={item.description}
                                            buttonLabel="Add"
                                            onPressButton={() => console.log("Add clicked")}
                                        />
                                    </View>
                                ))}
                            </View> 
                    ) : (
                        <View>
                            <Text>There is no item</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}