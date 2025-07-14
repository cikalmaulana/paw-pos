import { CE_Button } from "@/components/Button";
import { CE_Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

interface I_Props{
    lowStock: string
    veryLowStock: string
}

export default function StoreStockManagement(props: I_Props) {
    const [lowStockOpen, setLowStockOpen] = useState(false)
    const [lowStockThreshold, setLowStockThreshold] = useState(props.lowStock)
    const [veryLowStockThreshold, setVeryLowStockThreshold] = useState(props.veryLowStock)

    const doUpdateStockMgm = async () => {
        setLowStockOpen(false)
    }

    return (
        <View>
            <Text className="text-description mb-2 font-semibold mt-4">Stock Management</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col">
                    <Pressable 
                        className="flex flex-row items-center justify-between py-3"
                        onPress={() => setLowStockOpen(!lowStockOpen)}
                    >
                    <View className="flex flex-row items-center gap-3">
                        <Text className="text-primary font-semibold text-lg">Low Stock Setting</Text>
                    </View>
                    <Image 
                        source={require("@/assets/icons/right-arrow.png")}
                        style={{
                            width: 14,
                            height: 14,
                            transform: [{ rotate: lowStockOpen ? "90deg" : "0deg" }]
                        }}
                    />
                    </Pressable>

                    {lowStockOpen && (
                        <View className="flex flex-col mt-3 gap-3">
                            <Input
                                label="Low Stock"
                                keyboardType="numeric"
                                placeholder="Contoh: 10"
                                value={lowStockThreshold}
                                onChangeText={setLowStockThreshold}
                            />
                            <Input
                                label="Very Low Stock"
                                keyboardType="numeric"
                                placeholder="Contoh: 5"
                                value={veryLowStockThreshold}
                                onChangeText={setVeryLowStockThreshold}
                            />
                            <CE_Button 
                                title="Save"
                                onPress={() => doUpdateStockMgm()}
                                className="mt-2"
                            />
                        </View>
                    )}
                </View>
            </CE_Card>
        </View>
    )
}