import { CE_BackButton } from "@/components/BackButton"
import { CE_Button } from "@/components/Button"
import { CE_Loading } from "@/components/Loading"
import { CE_Search } from "@/components/Search"
import { API_GetTransactionReport } from "@/services/api/report/api.report"
import { I_TransactionReport } from "@/services/api/report/api.report.int"
import { priceFormat } from "@/services/function/formatPrice"
import { useLang } from "@/services/function/LangContext"
import { useLocale } from "@/services/function/useLocale"
import moment from "moment"; // untuk formatting tanggal, opsional
import { useEffect, useState } from "react"
import { Image, Pressable, RefreshControl, ScrollView, Text, View } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { locales } from "../locales"

interface I_Props {
    storeId: string
    setUpAlert: (msg: string, isSuccess: boolean) => void
    handleBack: () => void
}

export default function ReportTransaction({ storeId, setUpAlert, handleBack }: I_Props) {
    const { lang, setLang } = useLang()
    const language = useLocale(lang, locales)
    const [transactionData, setTransactionData] = useState<I_TransactionReport[]>([])
    const [filteredData, setFilteredData] = useState<I_TransactionReport[]>([])
    const [loading, setLoading] = useState(false)
    const [expandedIds, setExpandedIds] = useState<number[]>([])
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState<"default" | "asc" | "desc">("default")
    const [sortKey, setSortKey] = useState<"date" | "total" | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [activePickerType, setActivePickerType] = useState<"start" | "end" | null>(null)


    const toggleExpand = (idx: number) => {
        setExpandedIds((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
        )
    }

    const sortIcon = (
        sortBy === "default" ? require("@/assets/icons/sort.png")
        : sortBy === "asc" ? require("@/assets/icons/asc.png")
        : require("@/assets/icons/desc.png")
    )

    const changeSort = (key: "date" | "total") => {
        const nextSort = sortBy === "default" ? "asc" : sortBy === "asc" ? "desc" : "default"
        setSortKey(key)
        setSortBy(nextSort)
    }

    const applySearchAndSort = (data: I_TransactionReport[]) => {
        let temp = [...data]

        // Search
        if (search.trim()) {
            const lowerSearch = search.toLowerCase()
            temp = temp.filter(
                item =>
                    item.invoice_no.toLowerCase().includes(lowerSearch) ||
                    item.cashier_name.toLowerCase().includes(lowerSearch)
            )
        }

        // Sort
        if (sortKey && sortBy !== "default") {
            temp.sort((a, b) => {
                const aVal = sortKey === "date" ? new Date(a.date).getTime() : Number(a.total)
                const bVal = sortKey === "date" ? new Date(b.date).getTime() : Number(b.total)

                return sortBy === "asc" ? aVal - bVal : bVal - aVal
            })
        }

        if (startDate && endDate) {
            const start = new Date(startDate).getTime()
            const end = new Date(endDate).getTime()

            temp = temp.filter((item) => {
                const trxDate = new Date(item.date).getTime()
                return trxDate >= start && trxDate <= end
            })
        }

        setFilteredData(temp)
    }

    const initialData = async () => {
        setLoading(true)
        const result = await API_GetTransactionReport(storeId)
        if (result && result.meta.status === "success") {
            setTransactionData(result.data)
            setFilteredData(result.data)
        } else {
            setUpAlert("Connection lost.", false)
            handleBack()
        }
        setLoading(false)
    }

    useEffect(() => {
        initialData()
    }, [])

    useEffect(() => {
        applySearchAndSort(transactionData)
    }, [search, sortBy, sortKey, startDate, endDate])

    const onRefresh = async () => {
        setRefreshing(true)
        await initialData()
        setRefreshing(false)
    }

    function generatePDF(transactionData: I_TransactionReport[]): void {
        throw new Error("Function not implemented.")
    }

    return (
        <View>
            <CE_BackButton lable={language.transaction.title} onPress={handleBack} />
            {loading ? (
                <CE_Loading />
            ) : (
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
                    showsVerticalScrollIndicator={false}
                    className="min-h-screen"
                >
                    <View className="p-3">
                        <CE_Search
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Search by invoice or cashier name"
                            className="mb-4"
                        />
                    </View>

                    <View className="flex flex-row gap-3 mb-3">
                        <View className="flex-1">
                            <CE_Button title={language.button.pdf} onPress={() => generatePDF(transactionData)}/>
                        </View>
                        <View className="flex-1">
                            <CE_Button title={language.button.excel} bgColor="bg-secondary"/>
                        </View>
                    </View>

                    <Text className="font-bold text-lg mb-2">Filter</Text>
                    <View className="flex-row items-center gap-3 px-3 mb-4">
                        <View className="flex-1">
                            <Text className="text-xs text-gray-500 mb-1">{language.date.from}</Text>
                            <Pressable
                                onPress={() => {
                                    setActivePickerType("start")
                                    setDatePickerVisibility(true)
                                }}
                                className="border border-gray-300 rounded-lg p-2"
                            >
                                <Text className="text-sm text-gray-700">
                                    {startDate ?? language.date.start}
                                </Text>
                            </Pressable>
                        </View>
                        <View className="flex-1">
                            <Text className="text-xs text-gray-500 mb-1">{language.date.to}</Text>
                            <Pressable
                                onPress={() => {
                                    setActivePickerType("end")
                                    setDatePickerVisibility(true)
                                }}
                                className="border border-gray-300 rounded-lg p-2"
                            >
                                <Text className="text-sm text-gray-700">
                                    {endDate ?? language.date.end}
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center mb-3">
                        <Pressable onPress={() => changeSort("date")} className="flex-row items-center gap-2">
                            <Text className="font-semibold text-base">{language.transaction.sort.date}</Text>
                            <Image source={sortIcon} style={{ width: 18, height: 18 }} />
                        </Pressable>
                        <Pressable onPress={() => changeSort("total")} className="flex-row items-center gap-2">
                            <Text className="font-semibold text-base">{language.transaction.sort.total}</Text>
                            <Image source={sortIcon} style={{ width: 18, height: 18 }} />
                        </Pressable>
                    </View>

                    <View className="h-1 w-full bg-primary mt-2 mb-4"></View>

                    {filteredData.length === 0 ? (
                        <Text className="text-center text-gray-500 mt-10">No transactions found.</Text>
                    ) : (
                        <>
                            <Text className="font-bold text-xl mb-3">{language.transaction.list}</Text>
                            {filteredData.map((trx, idx) => {
                                const isExpanded = expandedIds.includes(idx)
                                return (
                                    <Pressable
                                        key={idx}
                                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 shadow-sm"
                                        onPress={() => toggleExpand(idx)}
                                    >
                                        <View className="flex-row justify-between items-start mb-1">
                                            <View className="flex-1">
                                                <Text className="text-primary font-semibold text-base">{trx.invoice_no}</Text>
                                                <Text className="text-xs text-gray-500">
                                                    {trx.date} • Kasir: {trx.cashier_name}
                                                </Text>
                                                <Text className="text-sm font-bold mt-1">
                                                    Total: {priceFormat(trx.total, "IDR")}
                                                </Text>
                                            </View>
                                            <Image
                                                source={require("@/assets/icons/right-arrow.png")}
                                                style={{
                                                    width: 14,
                                                    height: 14,
                                                    marginTop: 2,
                                                    transform: [{ rotate: isExpanded ? "90deg" : "0deg" }]
                                                }}
                                            />
                                        </View>

                                        {isExpanded && (
                                            <View className="border-t border-gray-200 pt-2 mt-2">
                                                {trx.items.map((item, i) => (
                                                    <View
                                                        key={i}
                                                        className="flex-row justify-between items-center mb-1"
                                                    >
                                                        <View className="flex-1">
                                                            <Text className="text-sm font-medium">{item.name}</Text>
                                                            <Text className="text-xs text-gray-500">
                                                                {item.qty} x {priceFormat(item.selling_price, "IDR")}
                                                            </Text>
                                                        </View>
                                                        <Text className="text-sm font-semibold text-black">
                                                            {priceFormat(
                                                                Number(item.selling_price) * Number(item.qty),
                                                                "IDR"
                                                            )}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                    </Pressable>
                                )
                            })}
                        </>
                    )}
                </ScrollView>
            )}

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                    const formatted = moment(date).format("YYYY-MM-DD")
                    if (activePickerType === "start") {
                        setStartDate(formatted)
                    } else {
                        setEndDate(formatted)
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
