import { MODAL_NAME } from "@/app/constant/constant";
import { CE_Button } from "@/components/Button";
import { I_Order } from "@/services/api/order/api.order.int";
import { priceFormat } from "@/services/function/formatPrice";
import { globalEmitter } from "@/services/function/globalEmitter";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { locales } from "../locales";

interface I_Props {
    language: typeof locales["id"]
    orderData: I_Order
}

export default function OrderList(props: I_Props) {
    const { orderData } = props
    const [expanded, setExpanded] = useState(false)

    const cancelOrder = (id: string) => {
        // do api thing
    }

    const doneOrder = (id: string) => {
        // do api thing
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => setExpanded(!expanded)}
                activeOpacity={0.9}
                className="bg-white rounded-lg px-4 py-3 mx-5 mb-4"
            >

                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                        <Text className="text-base font-semibold text-primary">
                            {orderData.invoice_no}
                        </Text>

                        <Text className="text-sm text-gray-500">
                            {new Date(orderData.created_at).toLocaleString()}
                        </Text>

                        <Text className="text-sm mt-1">
                            <Text className="text-gray-500">{props.language.item.cashier}: </Text>
                            <Text className="text-black">{orderData.cashier_name || "-"}</Text>
                        </Text>

                        {orderData.customer_data?.name && (
                            <Text className="text-sm">
                            <Text className="text-gray-500">{props.language.item.customer}: </Text>
                            <Text className="text-black">{orderData.customer_data.name}</Text>
                            </Text>
                        )}

                        {orderData.table_no && (
                            <Text className="text-sm">
                            <Text className="text-gray-500">{props.language.item.table}: </Text>
                            <Text className="text-black">{orderData.table_no}</Text>
                            </Text>
                        )}

                        {orderData.note && (
                            <Text className="text-sm italic">
                            <Text className="text-gray-500">{props.language.item.note}: </Text>
                            <Text className="text-black">{orderData.note}</Text>
                            </Text>
                        )}

                        <Text className="text-base font-bold mt-2 text-primary">
                            {priceFormat(orderData.total_price, "IDR")}
                        </Text>

                        <View className="flex flex-row gap-2 mt-3">
                            <CE_Button 
                                title={props.language.button.cancel}
                                className="flex-1"
                                bgColor="bg-danger"
                                onPress={() => {
                                    globalEmitter.emit(MODAL_NAME, {
                                        id: "moda:order:cancel",
                                        title: props.language.modal.cancel.title,
                                        description: props.language.modal.cancel.description,
                                        confirmText: props.language.button.done,
                                        cancelText: props.language.button.cancel,
                                        danger: true,
                                        onConfirm: async (close: () => void) => {
                                            cancelOrder(props.orderData.id)
                                            await close()
                                        },
                                        onCancel: (close: () => void) => {
                                            close()
                                        }
                                    })
                                }}

                            />
                            <CE_Button 
                                title={props.language.button.done}
                                className="flex-1"
                                onPress={() => {
                                    globalEmitter.emit(MODAL_NAME, {
                                        id: "moda:order:done",
                                        title: props.language.modal.done.title,
                                        description: props.language.modal.done.description,
                                        confirmText: props.language.button.done,
                                        cancelText: props.language.button.cancel,
                                        onConfirm: async (close: () => void) => {
                                            doneOrder(props.orderData.id)
                                            await close()
                                        },
                                        onCancel: (close: () => void) => {
                                            close()
                                        }
                                    })
                                }}
                            />
                        </View>
                    </View>

                    <View className="flex flex-row items-center gap-1 mt-2">
                            <Text className="font-bold">{props.language.item.detail}</Text>
                            <Image
                                source={require("@/assets/icons/right-arrow.png")}
                                style={{ 
                                    width: 12, 
                                    height: 12,
                                    transform: [{ 
                                        rotate: 
                                            (expanded)
                                                ? "90deg" 
                                                : "0deg" 
                                    }]
                                }}
                            />
                        </View>
                </View>

                {expanded && (
                    <View className="mt-3 border-t border-gray-200 pt-2">
                    {orderData.items.map((item) => (
                        <View
                            key={item.id}
                            className="flex-row justify-between items-center mb-1"
                        >
                        <View className="flex-1">
                            <Text className="text-sm font-medium text-black">{item.name}</Text>
                            <Text className="text-xs text-gray-500">
                                {item.qty} x {priceFormat(item.price, "IDR")}
                            </Text>
                        </View>
                        <Text className="text-sm font-semibold text-black">
                            {priceFormat(item.total_price, "IDR")}
                        </Text>
                        </View>
                    ))}

                    <Text className="text-sm text-gray-600 mt-2">
                        Payment Method: <Text className="font-medium text-black">{orderData.payment_method}</Text>
                    </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}
