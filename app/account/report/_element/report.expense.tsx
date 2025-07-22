import { CE_BackButton } from "@/components/BackButton";
import { CE_Search } from "@/components/Search";
import { I_Lang } from "@/services/api/other/api.language.int";
import { API_GetExpenseReport } from "@/services/api/report/api.report";
import { I_ExpenseReport, I_GetExpeseReportRequest } from "@/services/api/report/api.report.int";
import { priceFormat } from "@/services/function/formatPrice";
import { useLocale } from "@/services/function/useLocale";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { locales } from "../locales";

interface I_Props {
    storeId: string
    lang: I_Lang
    setUpAlert: (msg: string, isSuccess: boolean) => void
    handleBack: () => void
}

export default function ReportExpense(props: I_Props) {
    const language = useLocale(props.lang, locales);
    const [expenseData, setExpenseData] = useState<I_ExpenseReport>({
        total: "0",
        expense: [],
    })
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [activePickerType, setActivePickerType] = useState<"start" | "end" | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    const [sortBy, setSortBy] = useState<"default" | "asc" | "desc">("default")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getItemData()
    }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await getItemData()
        setRefreshing(false)
    } 

    const getItemData = async () => {
        try {
            const payload: I_GetExpeseReportRequest= {
                store_id: props.storeId,
                date_start: dateStart,
                date_end: dateEnd
            }
            const result = await API_GetExpenseReport(payload)
            if (result) {
                if (result.meta.status !== 'success' || result.data == null) {
                    props.setUpAlert("Connection lost.", false)
                    return
                }
                setExpenseData(result.data ?? { total: "0", expense: [] })
            } else {
                props.setUpAlert("Connection lost.", false)
                return
            }
        } catch (error) {
            console.error("Failed to get data.")
            props.setUpAlert("Connection lost.", false)
        }
    }

    const toggleSort = () => {
        if (sortBy === "default") setSortBy("desc")
        else if (sortBy === "desc") setSortBy("asc")
        else setSortBy("default")
    }

    const sortIcon = (
        sortBy === "default" ? require("@/assets/icons/sort.png")
        : sortBy === "asc" ? require("@/assets/icons/asc.png")
        : require("@/assets/icons/desc.png")
    )

    useEffect(() => {
        if(dateStart !== "" && dateEnd !== "") {
            setRefreshing(true)
            getItemData()
            setRefreshing(false)
        }
    },[dateStart, dateEnd])

    const filteredExpenseData = expenseData.expense
        .filter((item) =>
            item.maker.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "asc") {
                return Number(a.nominal) - Number(b.nominal)
            } else if (sortBy === "desc") {
                return Number(b.nominal) - Number(a.nominal)
            } else {
                return 0
            }
        })

    return (
        <View>
            <CE_BackButton lable={language.expense.title} onPress={props.handleBack} />
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
                <View className="flex flex-row items-center m-3 gap-4">
                    <View className="flex-1">
                        <CE_Search
                            value={searchTerm}
                            onChangeText={(text) => setSearchTerm(text)}
                            placeholder={language.expense.search}
                            className=""
                        />
                    </View>

                    <Pressable onPress={toggleSort}>
                        <Image
                            source={sortIcon}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>
                <Text className="font-bold text-lg mb-2">Filter</Text>
                <View className="flex-row items-center gap-3 px-3 mb-5">
                    <View className="flex-1">
                        <Text className="text-xs text-description  mb-1">{language.date.from}</Text>
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
                        <Text className="text-xs text-description  mb-1">{language.date.to}</Text>
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
                
                <Text className="text-primary font-bold text-xl mb-2">
                    Total: {priceFormat(expenseData.total, "IDR")}
                </Text>
                {filteredExpenseData.length > 0 ? (
                    filteredExpenseData.map((item, index) => (
                        <View key={index} className="bg-white shadow-sm rounded-xl p-4 mb-3 border border-gray-200">
                        <View className="flex-row justify-between mb-1">
                            <Text className="text-sm font-medium text-primary">
                                {moment(item.date).format("DD MMM YYYY")}
                            </Text>
                            <Text className="text-sm font-semibold text-red-500">
                                {priceFormat(item.nominal, "IDR")}
                            </Text>
                        </View>
                        <Text className="text-base text-gray-800 mb-1">
                            {item.description}
                        </Text>
                        <Text className="text-xs text-gray-500 italic">
                            {language.expense.by} : {item.maker}
                        </Text>
                        </View>
                    ))
                ) : (
                    <Text className="text-center text-gray-400 mt-10">No expense data available</Text>
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