import { CE_BackButton } from "@/components/BackButton";
import { I_Lang } from "@/services/api/other/api.language.int";
import { API_GetProfitAndLossReport } from "@/services/api/report/api.report";
import { I_ProfitAndLoss, I_ProfitAndLossRequest } from "@/services/api/report/api.report.int";
import { priceFormat } from "@/services/function/formatPrice";
import { useLocale } from "@/services/function/useLocale";
import moment from "moment";
import { useEffect, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { locales } from "../locales";

interface I_Props {
    storeId: string
    lang: I_Lang
    setUpAlert: (msg: string, isSuccess: boolean) => void
    handleBack: () => void
}

export default function ReportProfitLoss(props: I_Props) {
    const language = useLocale(props.lang, locales)
    const [profitLossData, setProfitLossData] = useState<I_ProfitAndLoss>()
    const [refreshing, setRefreshing] = useState(false)
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [activePickerType, setActivePickerType] = useState<"start" | "end" | null>(null)
    
    useEffect(() => {
        getItemData()
    }, [])

    const getItemData = async () => {
        try {
            const payload: I_ProfitAndLossRequest= {
                store_id: props.storeId,
                date_start: dateStart,
                date_end: dateEnd
            }

            const result = await API_GetProfitAndLossReport(payload)
            if (result) {
                if (result.meta.status !== 'success' || result.data == null) {
                    props.setUpAlert("Connection lost.", false)
                    return
                }
                setProfitLossData(result.data)
            } else {
                props.setUpAlert("Connection lost.", false)
                return
            }
        } catch (error) {
            console.error("Failed to get data.")
            props.setUpAlert("Connection lost.", false)
        }
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getItemData()
        setRefreshing(false)
    } 

    useEffect(() => {
        if(dateStart !== "" && dateEnd !== "") {
            setRefreshing(true)
            getItemData()
            setRefreshing(false)
        }
    },[dateStart, dateEnd])
    
    return (
        <View>
            <CE_BackButton lable={language.profit.title} onPress={props.handleBack} />

            <Text className="font-bold text-lg mb-2">Filter</Text>
            <View className="flex-row items-center gap-3 px-3 mb-4">
                <View className="flex-1">
                    <Text className="text-xs text-description  mb-1">From</Text>
                    <Pressable
                        onPress={() => {
                            setActivePickerType("start")
                            setDatePickerVisibility(true)
                        }}
                        className="border border-gray-300 rounded-lg p-2"
                    >
                        <Text className="text-sm text-gray-700">
                            {dateStart || language.date.start}
                        </Text>
                    </Pressable>
                </View>
                <View className="flex-1">
                    <Text className="text-xs text-description  mb-1">To</Text>
                    <Pressable
                        onPress={() => {
                            setActivePickerType("end")
                            setDatePickerVisibility(true)
                        }}
                        className="border border-gray-300 rounded-lg p-2"
                    >
                        <Text className="text-sm text-gray-700">
                            {dateEnd || language.date.end}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <ScrollView
                className="min-h-screen"
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
                {profitLossData && (
                    <View className="bg-white mx-3 my-3 rounded-2xl p-4 shadow-md">
                        <Text className="text-primary text-base font-bold mb-4">Profit & Loss Summary</Text>

                        <View className="flex-row justify-between mb-2">
                            <Text className="text-description font-medium">Total Revenue</Text>
                            <Text className="text-black font-semibold">{priceFormat(profitLossData.gross_revenue, "IDR")}</Text>
                        </View>
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-description  font-medium">Total Cost</Text>
                            <Text className="text-black font-semibold">{priceFormat(profitLossData.total_cost, "IDR")}</Text>
                        </View>
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-description  font-medium">Gross Profit</Text>
                            <Text className="text-secondary font-semibold">{priceFormat(profitLossData.gross_profit, "IDR")}</Text>
                        </View>
                        <View className="flex-row justify-between mt-3 pt-3 border-t border-deact">
                            <Text className="text-gray-700 font-bold">Net Income</Text>
                            <Text className="text-secondary font-bold">{priceFormat(profitLossData.net_income, "IDR")}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                    const formatted = moment(date).format("YYYY-MM-DD")
                    if (activePickerType === "start") {
                        setDateStart(formatted)
                    } else {
                        setDateEnd(formatted)
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