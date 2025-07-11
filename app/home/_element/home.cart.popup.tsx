import { CE_Button } from "@/components/Button";
import { CE_Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { I_Cart } from "@/services/api/transactional/api.cart.int";
import { priceFormat } from "@/services/function/formatPrice";
import { useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";



interface I_Props {
    isOpen: boolean;
    cartItem: I_Cart
    setClose: () => void;
}

export default function HomeCartPopup(props: I_Props) {
    const { width, height } = Dimensions.get("window");
    const [paymentMethod, setPaymentMethod] = useState('')
    const [warningPayment, setWarningPayment] = useState('')
    const [warningName, setWarningName] = useState('')
    const [customerName, setCustomerName] = useState('');

    const totalCartPrice = props.cartItem.items.reduce((sum, item) => {
        return sum + parseInt(item.total_price);
    }, 0);

    const checkout = () => {
        if(customerName === '') {
            setWarningName('Please input customer name first!')
            return
        }
        if(paymentMethod === '') {
            setWarningPayment('Please select payment method first!')
            return
        }
    }

    const deleteCart = () => {

    }
    
    return (
        <Modal
            visible={props.isOpen}
            transparent
            animationType="fade"
            onRequestClose={props.setClose}
        >
            <View className="flex-1 bg-black/50 justify-center items-center">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="w-full items-center"
                >
                    <ScrollView
                        style={{ width: width * 0.85, maxHeight: height * 0.8 }}
                        contentContainerStyle={{ padding: 16 }}
                        className="bg-white rounded-2xl"
                        keyboardShouldPersistTaps="handled"
                    >
                        <Pressable onPress={props.setClose} className="flex flex-row items-center gap-2 absolute top-3 right-3 z-10">
                            <Text className="text-danger text-sm font-bold">Close</Text>
                            <Image 
                                source={require("@/assets/icons/cross.png")}
                                style={{width:28, height: 28}}
                            />
                        </Pressable>

                        <Text className="text-primary font-bold text-xl mb-2 mt-6">
                            Total: {props.cartItem.items.length} item
                        </Text>

                        {props.cartItem.items.map((item) => (
                            <View key={item.id} className="flex flex-row gap-2 border-b pb-2 pt-4 mb-2">
                                <Image
                                    source={item.image}
                                    className="w-24 h-24 rounded-xl mb-2"
                                    resizeMode="cover"
                                />
                                <View className="flex flex-col">
                                    <Text className="text-lg text-primary font-semibold" numberOfLines={1}>{item.name}</Text>
                                    <Text className="text-sm font-semibold">Price: {priceFormat(item.price, "IDR")}</Text>
                                    <Text className="text-sm text-gray-600">Qty: {item.qty}</Text>
                                    <Text className="text-sm font-semibold">Total: {priceFormat(item.total_price, "IDR")}</Text>
                                </View>
                            </View>
                        ))}

                        <Input
                            label="Customer Name"
                            placeholder="Enter name"
                            value={customerName}
                            onChangeText={(text) => setCustomerName(text)}
                        />
                        {warningName !== '' && <Text className="text-base font-semibold text-danger">{warningName}</Text>}

                        <View className="mb-2 mt-2">
                            <CE_Dropdown
                                label="Payment Method"
                                selected={paymentMethod}
                                options={[
                                    { label: "QRIS", value: "QRIS" },
                                    { label: "Cash", value: "Cash" },
                                    { label: "Transfer", value: "Transfer" },
                                ]}
                                onSelect={(val) => setPaymentMethod(val)}
                            />
                            {warningPayment !== '' && <Text className="text-base font-semibold text-danger">{warningPayment}</Text>}
                        </View>

                        <View className="flex flex-row items-center justify-between gap-4 my-2">
                            <Text className="text-xl font-bold text-primary">Total</Text>
                            <Text className="text-xl font-bold">{priceFormat(totalCartPrice.toString(), "IDR")}</Text>
                        </View>

                        <View className="flex flex-row justify-between gap-2 mt-2">
                            <View className="flex-1">
                            <CE_Button title="Delete" onPress={deleteCart} bgColor="bg-danger" className="w-full" />
                            </View>
                            <View className="flex-1">
                            <CE_Button title="Checkout" onPress={checkout} className="w-full" />
                            </View>
                        </View>
                        </ScrollView>


                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}
