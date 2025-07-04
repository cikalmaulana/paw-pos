import { TAB_HEIGHT } from "@/app/(tabs)/constant";
import { CE_ItemCard } from "@/components/ItemCard";
import { I_Menu } from "@/services/api/api.item.get.int";
import { I_Cart } from "@/services/api/api.pruchase.int";
import { priceFormat } from "@/services/function/formatPrice";
import { FlatList, View } from "react-native";

interface I_Props{
    item: I_Menu[]
    selectedItem:(item: I_Menu)=>void
    cartItem: I_Cart
}

export default function HomeItemList(props: I_Props) {
    return (
        <FlatList
            data={props.item}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: TAB_HEIGHT + 350,
            }}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            className="mt-2 min-h-screen"
            renderItem={({ item }) => {
                const isInCart = props.cartItem.items.some(cart => cart.id === item.id);
                
                return (
                    <View className="w-[48%] mb-4">
                        <CE_ItemCard
                            image={item.image}
                            title={item.name}
                            price={priceFormat(item.price, "IDR")}
                            description={item.description}
                            buttonLabel={isInCart ? "Edit" : "Add"}
                            onPressButton={() => props.selectedItem(item)}
                        />
                    </View>
                );
            }}
            
        />
    )
}