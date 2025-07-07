import { CE_Card } from "@/components/Card";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

interface I_Props{
    setManageOpen:(manage: string) => void
    doLogout:()=>void
}

export default function AccountSettingList(props: I_Props){
    return (
        <ScrollView
            className="flex flex-col gap-3"
            contentContainerStyle={{ paddingBottom: 700 }}
        >

            <Text className="text-description mb-2 font-semibold">Manage Account & Store</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col ">
                    <Pressable 
                        className="flex flex-row items-center justify-between border-b border-b-gray-200 py-3" 
                        onPress={() => props.setManageOpen('detail')}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Image 
                                source={require("@/assets/icons/user2.png")}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text className="text-primary font-semibold text-lg">Profile Details</Text>
                        </View>
                        <Image 
                            source={require("@/assets/icons/right-arrow.png")}
                            style={{ width: 14, height: 14 }}
                        />
                    </Pressable>

                    <Pressable 
                        className="flex flex-row items-center justify-between border-b border-b-gray-200 py-3" 
                        onPress={() => props.setManageOpen('item')}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Image 
                                source={require("@/assets/icons/items.png")}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text className="text-primary font-semibold text-lg">Manage Items</Text>
                        </View>
                        <Image 
                            source={require("@/assets/icons/right-arrow.png")}
                            style={{ width: 14, height: 14 }}
                        />
                    </Pressable>

                    <Pressable 
                        className="flex flex-row items-center justify-between border-b border-b-gray-200 py-3" 
                        onPress={() => props.setManageOpen('admin')}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Image 
                                source={require("@/assets/icons/admins.png")}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text className="text-primary font-semibold text-lg">Manage Admins</Text>
                        </View>
                        <Image 
                            source={require("@/assets/icons/right-arrow.png")}
                            style={{ width: 14, height: 14 }}
                        />
                    </Pressable>

                    <Pressable 
                        className="flex flex-row items-center justify-between border-b border-b-gray-200 py-3" 
                        onPress={() => props.setManageOpen('store')}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Image 
                                source={require("@/assets/icons/store.png")}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text className="text-primary font-semibold text-lg">Manage Store</Text>
                        </View>
                        <Image 
                            source={require("@/assets/icons/right-arrow.png")}
                            style={{ width: 14, height: 14 }}
                        />
                    </Pressable>

                    <Pressable 
                        className="flex flex-row items-center justify-between py-3" 
                        onPress={() => props.setManageOpen('report')}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Image 
                                source={require("@/assets/icons/report.png")}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text className="text-primary font-semibold text-lg">Report</Text>
                        </View>
                        <Image 
                            source={require("@/assets/icons/right-arrow.png")}
                            style={{ width: 14, height: 14 }}
                        />
                    </Pressable>
                </View>
            </CE_Card>

            <Text className="text-description mb-2 font-semibold mt-5">More</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col "> 
                    <Pressable 
                        className="flex flex-row items-center justify-between border-b border-b-gray-200 py-3" 
                        onPress={() => props.setManageOpen('report')}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Image 
                                source={require("@/assets/icons/padlock.png")}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text className="text-primary font-semibold text-lg">Change Pin</Text>
                        </View>
                        <Image 
                            source={require("@/assets/icons/right-arrow.png")}
                            style={{ width: 14, height: 14 }}
                        />
                    </Pressable>

                    <Pressable 
                        className="flex flex-row items-center justify-between border-b border-b-gray-200 py-3" 
                        onPress={() => props.setManageOpen('report')}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Image 
                                source={require("@/assets/icons/policy.png")}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text className="text-primary font-semibold text-lg">Privacy Policy</Text>
                        </View>
                        <Image 
                            source={require("@/assets/icons/right-arrow.png")}
                            style={{ width: 14, height: 14 }}
                        />
                    </Pressable>

                    <Pressable 
                        className="flex flex-row items-center justify-between border-b border-b-gray-200 py-3" 
                        onPress={() => props.setManageOpen('report')}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Image 
                                source={require("@/assets/icons/customer-service.png")}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text className="text-primary font-semibold text-lg">Contact Center</Text>
                        </View>
                        <Image 
                            source={require("@/assets/icons/right-arrow.png")}
                            style={{ width: 14, height: 14 }}
                        />
                    </Pressable>

                    <Pressable 
                        className="flex flex-row items-center justify-between py-3" 
                        onPress={() => props.setManageOpen('report')}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Image 
                                source={require("@/assets/icons/about.png")}
                                style={{ width: 18, height: 18 }}
                            />
                            <Text className="text-primary font-semibold text-lg">About Application</Text>
                        </View>
                        <Image 
                            source={require("@/assets/icons/right-arrow.png")}
                            style={{ width: 14, height: 14 }}
                        />
                    </Pressable>
                </View>
            </CE_Card>

            <Pressable className="mt-10 items-center" onPress={() => props.doLogout()}>
                <Text className="text-danger text-lg font-semibold">Logout</Text>
            </Pressable>
        </ScrollView>
    )
}