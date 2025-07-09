import { CE_Card } from "@/components/Card";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

interface I_Props{
    setManageOpen:(manage: string) => void
    doLogout:()=>void
}

export default function AccountSettingList(props: I_Props){
    const manageAccStoreList = [
        { key: 'detail', label: 'Edit Profile', image:require("@/assets/icons/user2.png") },
        { key: 'item', label: 'Manage Item', image:require("@/assets/icons/items.png")  },
        { key: 'admin', label: 'Manage Admin', image:require("@/assets/icons/admins.png")  },
        { key: 'store', label: 'Manage Store', image:require("@/assets/icons/store.png")  },
        { key: 'report', label: 'Report', image:require("@/assets/icons/report.png")  },
    ]
    const moreList = [
        { key: 'pin', label: 'Change Pin', image:require("@/assets/icons/padlock.png") },
        { key: 'privacypolicy', label: 'Privacy Policy', image:require("@/assets/icons/policy.png")  },
        { key: 'cs', label: 'Contact Center', image:require("@/assets/icons/customer-service.png")  },
        { key: 'about', label: 'About', image:require("@/assets/icons/about.png")  },
    ]

    return (
        <ScrollView
            className="flex flex-col gap-3"
            contentContainerStyle={{ paddingBottom: 500 }}
        >

            <Text className="text-description mb-2 font-semibold">Manage Account & Store</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col ">
                    {manageAccStoreList.map((item, index) => {
                        const isLast = index === manageAccStoreList.length - 1;
                        return (
                            <Pressable 
                                className={`flex flex-row items-center justify-between py-3 ${
                                    !isLast ? "border-b border-b-gray-200" : ""
                                }`}
                                onPress={() => props.setManageOpen(item.key)}
                                key={item.key}
                            >
                                <View className="flex flex-row items-center gap-3">
                                    <Image 
                                        source={item.image}
                                        style={{ width: 18, height: 18 }}
                                    />
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

            <Text className="text-description mb-2 font-semibold mt-5">More</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col "> 
                    {moreList.map((item, index) => {
                        const isLast = index === moreList.length - 1;
                        return (
                            <Pressable 
                                className={`flex flex-row items-center justify-between py-3 ${
                                    !isLast ? "border-b border-b-gray-200" : ""
                                }`}
                                onPress={() => props.setManageOpen('detail')}
                                key={item.key}
                            >
                                <View className="flex flex-row items-center gap-3">
                                    <Image 
                                        source={item.image}
                                        style={{ width: 18, height: 18 }}
                                    />
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

            <Pressable className="mt-10 items-center" onPress={() => props.doLogout()}>
                <Text className="text-danger text-lg font-semibold">Logout</Text>
            </Pressable>

            <View className="w-full items-center mt-2 mb-10">
                <Text className="text-description text-lg font-semibold">
                    v1.0
                </Text>
            </View>

        </ScrollView>
    )
}