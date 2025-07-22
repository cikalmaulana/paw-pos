import { CE_BackButton } from "@/components/BackButton";
import { CE_Button } from "@/components/Button";
import { CE_ItemCardProductReport } from "@/components/ItemCard";
import { CE_Search } from "@/components/Search";
import { API_GetMostSellingProduct } from "@/services/api/item/api.item.get";
import { I_MostSellingProduct } from "@/services/api/item/api.item.get.int";
import { I_Lang } from "@/services/api/other/api.language.int";
import { useLocale } from "@/services/function/useLocale";
import { useEffect, useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { locales } from "../locales";

interface I_Props {
    storeId: string
    lang: I_Lang
    setUpAlert: (msg: string, isSuccess: boolean) => void
    handleBack: () => void
}

export default function ReportProduct(props: I_Props) {
    const language = useLocale(props.lang, locales);
    const [itemData, setItemData] = useState<I_MostSellingProduct[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState<"default" | "asc" | "desc">("default")

    useEffect(() => {
        getItemData()
    }, [])

    const getItemData = async () => {
        try {
            const result = await API_GetMostSellingProduct(props.storeId)
            if (result) {
                if (result.meta.status !== 'success' || result.data == null) {
                    props.setUpAlert("Connection lost.", false)
                    return
                }
                setItemData(result.data)
            } else {
                props.setUpAlert("Connection lost.", false)
                return
            }
        } catch (error) {
            console.error("Failed to get item data.")
            props.setUpAlert("Connection lost.", false)
        }
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getItemData()
        setSearchTerm("")
        setSortBy("default")
        setRefreshing(false)
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

    let filteredData = itemData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortBy !== "default") {
        filteredData = [...filteredData].sort((a, b) => {
            const profitA = (parseFloat(a.selling_price) - parseFloat(a.cost_price)) * parseFloat(a.total_selling)
            const profitB = (parseFloat(b.selling_price) - parseFloat(b.cost_price)) * parseFloat(b.total_selling)
            return sortBy === "asc" ? profitA - profitB : profitB - profitA
        })
    }

    return (
        <View>
            <CE_BackButton lable={language.product.title} onPress={props.handleBack} />
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
                            placeholder={language.product.search}
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

                <View className="flex flex-row gap-3 my-3">
                    <View className="flex-1">
                        <CE_Button title={language.button.pdf} />
                    </View>
                    <View className="flex-1">
                        <CE_Button title={language.button.excel} bgColor="bg-secondary"/>
                    </View>
                </View>

                <Text className="text-primary text-lg font-semibold mb-2">
                    Total : {filteredData.length} {filteredData.length > 1 ? language.product.units : language.product.unit}
                </Text>

                {filteredData.map((item) => (
                    <View key={item.id} className="mb-4">
                        <CE_ItemCardProductReport
                            name={item.name}
                            image={item.image}
                            costPrice={item.cost_price}
                            costPriceTitle={language.product.list.title.cost}
                            sellingPriceTitle={language.product.list.title.selling}
                            sellingPrice={item.selling_price}
                            totalSelling={item.total_selling}
                            totalSellingTitle={language.product.list.title.total}
                            salesProfitTitle={language.product.list.title.profit}
                            className={''}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
