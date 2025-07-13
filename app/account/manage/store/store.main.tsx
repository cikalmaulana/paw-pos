import { CE_BackButton } from "@/components/BackButton";
import { CE_Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { I_Store } from "@/services/api/store/api.store.int";
import { priceFormat } from "@/services/function/formatPrice";
import { updateStoreData } from "@/services/function/updateStoreData";
import { useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, Switch, Text, View } from "react-native";

interface I_Props {
    storeData:I_Store
    balance: string
    handleBack:()=>void
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
}

export default function ManageStore(props: I_Props){
    const [balance, setBalance] = useState(props.storeData.balance)
    const [manageOpen, setManageOpen] = useState('')
    const [storeData, setStoreData] = useState<I_Store | undefined>(props.storeData)
    const [refreshing, setRefreshing] = useState(false)
    const [needOngoing, setNeedOngoing] = useState(false)
    const [needTableNo, setNeedTableNo] = useState(false)
    const [lowStockOpen, setLowStockOpen] = useState(false)
const [lowStockThreshold, setLowStockThreshold] = useState("10")
const [veryLowStockThreshold, setVeryLowStockThreshold] = useState("5")


    const storeSettingList = [
        { key: 'detail', label: 'Store Detail' },
        { key: 'balance', label: 'Adjust Balance' },
    ]

    const transactionSettingList = [
        { key: 'tax', label: 'Tax & Service' },
        { key: 'receipt', label: 'Receipt Setting' },
        { key: 'discount', label: 'Discount Setting' },
        { key: 'currency', label: 'Set Currency' },
    ]

    const onRefresh = async () => {
        setRefreshing(true)
        await getStoreData()
        setRefreshing(false)
    }

    const getStoreData = async () => {
        const result = await updateStoreData()
        if(result !== null) {
            setBalance(result.balance)
        } else {
            setupAlert("Failed to refresh user data. Please try again.", false)
        }
    }

    const setupAlert = (msg: string, isSuccess: boolean) => {
        props.setAlertMsg(msg)
        props.setAlertSuccess(isSuccess)
        props.setShowAlert(true)
    }

    return (
        <View>
            <CE_BackButton lable="Manage Store" onPress={props.handleBack}/>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#16B8A8"]}       
                        tintColor="#16B8A8"        
                        title="Loading..."         
                        titleColor="#16B8A8"        
                    />
                }
                contentContainerStyle={{ paddingBottom: 700 }}
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-secondary text-3xl font-bold mb-3">{props.storeData.name}</Text>
                <CE_Card className="bg-primary p-5 flex justify-center mb-8">
                    <Text className="text-white font-semibold text-lg">Store Balance</Text>
                    <Text className="text-white font-bold text-3xl">{priceFormat(balance, "IDR")}</Text>
                </CE_Card>

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
                                    onPress={() => setManageOpen(item.key)}
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

                <Text className="text-description mb-2 font-semibold mt-4">Store Setting</Text>
                <CE_Card className="bg-white !shadow-none p-3">
                    <View className="flex flex-col ">
                        <Pressable
                            className={`flex flex-row items-center justify-between py-3 border-b border-b-gray-200`}
                        >
                            <View className="flex flex-row items-center gap-3">
                                <Text className="text-primary font-semibold text-lg">Need On Going Order</Text>
                            </View>
                            <Switch
                                value={needOngoing}
                                onValueChange={() => setNeedOngoing(!needOngoing)}
                                thumbColor={needOngoing ? "#10b981" : "#f4f3f4"}
                                trackColor={{ false: "#ccc", true: "#a7f3d0" }}
                            />
                        </Pressable>
                    </View>
                    <View className="flex flex-col ">
                        <Pressable
                            className={`flex flex-row items-center justify-between py-3 border-b border-b-gray-200`}
                        >
                            <View className="flex flex-row items-center gap-3">
                                <Text className="text-primary font-semibold text-lg">Need Table Number</Text>
                            </View>
                            <Switch
                                value={needTableNo}
                                onValueChange={() => setNeedTableNo(!needTableNo)}
                                thumbColor={needTableNo ? "#10b981" : "#f4f3f4"}
                                trackColor={{ false: "#ccc", true: "#a7f3d0" }}
                            />
                        </Pressable>
                    </View>
                </CE_Card>

                <Text className="text-description mb-2 font-semibold mt-4">Transaction Management</Text>
                <CE_Card className="bg-white !shadow-none p-3">
                    <View className="flex flex-col ">
                        {transactionSettingList.map((item, index) => {
                            const isLast = index === transactionSettingList.length - 1;
                            return (
                                <Pressable 
                                    className={`flex flex-row items-center justify-between py-3 ${
                                        !isLast ? "border-b border-b-gray-200" : ""
                                    }`}
                                    onPress={() => setManageOpen(item.key)}
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

                <Text className="text-description mb-2 font-semibold mt-4">Stock Management</Text>

                <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col">
                    {/* Header / Toggle */}
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

                    {/* Collapsible Content */}
                    {lowStockOpen && (
                    <View className="mt-3 space-y-4">
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
                    </View>
                    )}
                </View>
                </CE_Card>

            </ScrollView>
        </View>
    )
}