import { CE_Search } from "@/components/Search";
import { I_Order } from "@/services/api/order/api.order.int";
import { I_Store } from "@/services/api/store/api.store.int";
import { I_User } from "@/services/api/user/api.user.get.int";
import moment from "moment";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { locales } from "../locales";
import OrderList from "./history.list";

interface I_Props {
    language: typeof locales["id"]
    userData: I_User
    storeData: I_Store
    orderData: I_Order[]
}

export default function HistoryMain(props: I_Props) {
    const [searchInput, setSearchInput] = useState('')
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [activePickerType, setActivePickerType] = useState<"start" | "end" | null>(null)

    const filteredOrders = props.orderData.filter((item) => {
        const keyword = searchInput.toLowerCase();

        const matchSearch =
            item.invoice_no.toLowerCase().includes(keyword) ||
            item.cashier_name?.toLowerCase().includes(keyword) ||
            item.customer_data?.name.toLowerCase().includes(keyword)

        const orderDate = moment(item.created_at).format("YYYY-MM-DD");
        const matchStart = startDate ? orderDate >= startDate : true;
        const matchEnd = endDate ? orderDate <= endDate : true;

        return matchSearch && matchStart && matchEnd;
    });

    return (
        <View className="min-h-screen my-4">
            <View className="mb-6 mx-4">
                <CE_Search 
                    placeholder={props.language.search}
                    value={searchInput}
                    onChangeText={setSearchInput}
                />
            </View>

            <View className="mx-4">
                <Text className="font-bold text-lg mb-2">Filter</Text>

                <View className="flex-row gap-3 items-end mb-4">
                    <View className="flex-1">
                        <Text className="text-xs text-gray-500 mb-1">{props.language.date.from}</Text>
                        <Pressable
                            onPress={() => {
                                setActivePickerType("start")
                                setDatePickerVisibility(true)
                            }}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            <Text className="text-sm text-gray-700">
                                {startDate ?? props.language.date.start}
                            </Text>
                        </Pressable>
                    </View>

                    <View className="flex-1">
                        <Text className="text-xs text-gray-500 mb-1">{props.language.date.to}</Text>
                        <Pressable
                            onPress={() => {
                                setActivePickerType("end")
                                setDatePickerVisibility(true)
                            }}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            <Text className="text-sm text-gray-700">
                                {endDate ?? props.language.date.end}
                            </Text>
                        </Pressable>
                    </View>

                    <View className="items-end justify-end pb-[1px]">
                        <Pressable
                            onPress={() => {
                                setSearchInput('')
                                setStartDate(null)
                                setEndDate(null)
                            }}
                            className="px-3 py-1 bg-gray-200 rounded-full"
                        >
                            <Text className="text-sm text-gray-700">{props.language.clear}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            {filteredOrders.map((item, index) => (
                <View key={index}>
                    <OrderList 
                        language={props.language}
                        orderData={item}
                    />
                </View>
            ))}

            {filteredOrders.length === 0 && (
                <Text className="text-center text-gray-500 mt-10">
                    {props.language.empty || "No orders found."}
                </Text>
            )}

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={activePickerType === "end" && startDate ? new Date(startDate) : undefined}
                onConfirm={(date) => {
                    const formatted = moment(date).format("YYYY-MM-DD")
                    if (activePickerType === "start") {
                        setStartDate(formatted)
                        if (endDate && moment(formatted).isAfter(endDate)) {
                            setEndDate(null)
                        }
                    } else {
                        setEndDate(formatted)
                    }
                    setDatePickerVisibility(false)
                    setActivePickerType(null)
                }}
                onCancel={() => {
                    setDatePickerVisibility(false)
                    setActivePickerType(null)
                }}
            />
        </View>
    )
}