import { I_Order } from "@/services/api/order/api.order.int";
import { I_Store } from "@/services/api/store/api.store.int";
import { I_User } from "@/services/api/user/api.user.get.int";
import { Text, View } from "react-native";
import { locales } from "../locales";
import OrderList from "./order.list";

interface I_Props {
    language: typeof locales["id"]
    userData: I_User
    storeData: I_Store
    orderData: I_Order[]
}

export default function OrderMain(props: I_Props) {
    return (
        <View className="min-h-screen my-4">
            <Text className="font-bold text-xl mx-5 mb-2 text-secondary">{props.language.total}: {props.orderData.length}</Text>
            {props.orderData.length > 0 && <Text className="text-danger mx-5 mb-5">{props.language.hint}</Text>}
            {props.orderData.map((item, index) => {
                return (
                    <View key={index}>
                        <OrderList 
                            language={props.language}
                            orderData={item}
                            key={index}
                        />
                    </View>
                )
            })}
        </View>
    )
}