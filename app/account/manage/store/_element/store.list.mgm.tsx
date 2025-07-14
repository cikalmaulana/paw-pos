import { CE_Card } from "@/components/Card";
import { Image, Pressable, Text, View } from "react-native";

interface I_Props{
    handleSelect:(key: string) => void
}

export default function StoreManagementList(props: I_Props) {
    const storeSettingList = [
        { key: 'detail', label: 'Store Detail' },
        { key: 'balance', label: 'Adjust Balance' },
    ]

    return (
        <View>
            <Text className="text-description mb-2 font-semibold">Store Management</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col ">
                    {storeSettingList.map((item, index) => {
                        const isLast = index === storeSettingList.length - 1;
                        return (
                            <Pressable 
                                className={`flex flex-row items-center justify-between py-3 ${
                                    !isLast ? "border-b border-b-gray-200" : ""
                                }`}
                                onPress={() => props.handleSelect(item.key)}
                                key={item.key}
                            >
                                <View className="flex flex-row items-center gap-3">
                                    <Text className="text-primary font-semibold text-lg">{item.label}</Text>
                                </View>
                                <Image 
                                    source={require("@/assets/icons/right-arrow.png")}
                                    style={{ width: 14, height: 14 }}
                                />
                            </Pressable>
                        )
                    })}
                </View>
            </CE_Card>
        </View>
    )
}