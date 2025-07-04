import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { I_Menu } from "@/services/api/api.item.get.int";
import { priceFormat } from "@/services/function/formatPrice";
import { useEffect, useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";

interface I_Props {
    isOpen: boolean
    item: I_Menu | null
    setClose: () => void
    setItem:(id: string, qty: string)=> void
    removeItem: (id: string) => void
    cartItem?: { qty: string } | null
}

export default function HomeAddItem(props: I_Props) {
    const { width, height } = Dimensions.get("window");

    const [qty, setQty] = useState<string>(props.cartItem?.qty ?? '');

    useEffect(() => {
        if (props.cartItem) {
            setQty(props.cartItem.qty)
        } else {
            setQty('')
        }
    }, [props.cartItem, props.item])    

    return (
        <Modal
            visible={props.isOpen}
            transparent
            animationType="fade"
            onRequestClose={props.setClose}
        >
            <Pressable
                onPress={props.setClose}
                className="flex-1 bg-black/50 justify-center items-center"
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="w-full items-center"
                >
                    <ScrollView 
                        contentContainerStyle={{ 
                            alignItems: "center", 
                            justifyContent: "center", 
                            flexGrow: 1 
                        }} 
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={{ 
                            width: width * 0.85, 
                            height: height * 0.5,
                        }} className="bg-white rounded-2xl p-4">
                            <View className="flex-1 justify-between space-y-2">
                                <View>
                                    <Image
                                        source={props.item?.image}
                                        className="w-full h-52 rounded-xl mb-4"
                                        resizeMode="cover"
                                    />
                                    <Text 
                                        className="text-primary text-2xl font-bold mb-2" 
                                        numberOfLines={2}
                                        style={{ lineHeight: 22 }} 
                                    >
                                        {props.item?.name}
                                    </Text>
                                    <Text className="text-black text-lg font-bold mb-1">{priceFormat(props.item?.price ?? "", "IDR")}</Text>
                                    <Text
                                        className="text-gray-500 text-base"
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        {props.item?.description}
                                    </Text>
                                </View>

                                <Input 
                                    label="qty"
                                    placeholder="0"
                                    onChangeText={setQty}
                                    keyboardType="numeric"
                                    value={qty}
                                />

                                {props.cartItem ? (
                                    <View className="flex-row justify-between gap-2 mt-2">
                                        <CE_Button
                                            title="Update"
                                            onPress={() => props.item && props.setItem(props.item.id, qty || '')}
                                            disabled={qty === ''}
                                            className="flex-1"
                                        />
                                        <CE_Button
                                            title="Delete"
                                            onPress={() => props.item && props.removeItem(props.item.id)}
                                            className="flex-1"
                                            bgColor="bg-danger"
                                        />
                                    </View>
                                ) : (
                                    <CE_Button 
                                        title="Add to Cart"
                                        onPress={() => {
                                            props.item && props.setItem(props.item.id, qty || '')
                                        }}
                                        disabled={qty === ''}
                                        className="mt-2"
                                    />
                                )}

                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Pressable>
        </Modal>
    );
}
