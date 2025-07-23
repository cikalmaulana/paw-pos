import { CE_Card } from "@/components/Card";
import { Image, Pressable, Text, View } from "react-native";

interface I_Props{
    title:string
    setManageItemOpen:(manage: string)=>void
    manageItemList: { key: string; label: string, image: number }[]
}

export function ManageItemList(props: I_Props) {
    return (
        <View
            className="flex flex-col gap-3"
        >
            <Text className="text-description mb-2 font-semibold">
                {props.title}
            </Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col">
                    {props.manageItemList.map((item, index) => {
                        const isLast = index === props.manageItemList.length - 1;
                        return (
                            <View key={item.key}>
                                <Pressable
                                    className={`flex flex-row items-center justify-between py-3 ${
                                        !isLast ? "border-b border-b-gray-200" : ""
                                    }`}
                                    onPress={() => props.setManageItemOpen(item.key)}
                                >
                                    <View className="flex flex-row items-center gap-3">
                                        <Image
                                            source={item.image}
                                            style={{ width: 18, height: 18 }}
                                        />
                                        <Text className="text-primary font-semibold text-lg">
                                            {item.label}
                                        </Text>
                                    </View>
                                    <Image
                                        source={require("@/assets/icons/right-arrow.png")}
                                        style={{ width: 14, height: 14 }}
                                    />
                                </Pressable>
                            </View>
                        )
                    })}
                </View>
            </CE_Card>
        </View>
    )
}
