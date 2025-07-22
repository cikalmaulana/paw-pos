import { CE_BackButton } from "@/components/BackButton";
import { CE_Card } from "@/components/Card";
import { CE_Chart } from "@/components/Chart";
import { CE_Loading } from "@/components/Loading";
import { I_Lang } from "@/services/api/other/api.language.int";
import { I_Report } from "@/services/api/report/api.report.int";
import { priceFormat } from "@/services/function/formatPrice";
import { useLocale } from "@/services/function/useLocale";
import { lazy, Suspense, useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { locales } from "./locales";

const ReportProduct = lazy(() => import('./_element/report.product'))
const ReportProfitLoss = lazy(() => import('./_element/report.profit.loss'))
const ReportTransaction = lazy(() => import('./_element/report.transaction'))
const ReportExpense = lazy(() => import('./_element/report.expense'))

interface I_Props {
    storeId: string
    lang: I_Lang
    handleBack:()=>void
    setupAlert:(msg: string, isSuccess: boolean)=>void
}

export default function AccountReport(props: I_Props){
    const [refreshing, setRefreshing] = useState(false)
    const [manageOpen, setManageOpen] = useState('')
    const language = useLocale(props.lang, locales);
    const reportMenus = Object.entries(language.main.menu); 
    const [reportData, setReportData] = useState<I_Report>({
        total:{
            income: "125402500",
            daily: "",
            weekly: "",
            monthly: ""
        }
    })

    const onRefresh = () => {

    }
        
    return (
        <View>
            {manageOpen === '' ? (
                <>
                    <CE_BackButton lable={language.title} onPress={props.handleBack}/>

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
                        contentContainerStyle={{ paddingBottom: 600 }}
                    >
                        
                        <CE_Card className="bg-primary p-5 flex justify-center mb-8">
                            <Text className="text-white font-semibold text-lg">{language.subTitle}</Text>
                            <Text className="text-white font-bold text-3xl">{priceFormat(reportData.total.income, "IDR")}</Text>
                        </CE_Card>

                        <CE_Chart
                            chart={{
                                label: "Penjualan Minggu Ini",
                                labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
                                data: [120000, 250000, 190000, 300000, 280000, 350000, 400000],
                                color: "#34d399",
                            }}
                        />

                        <Text className="text-description mb-2 font-semibold">{language.title}</Text>
                        <CE_Card className="bg-white !shadow-none p-3">
                            <View className="flex flex-col ">
                                {reportMenus.map(([key, label], index) => {
                                    const isLast = index === reportMenus.length - 1;
                                    return (
                                        <Pressable
                                            key={index}
                                            className={`flex flex-row items-center justify-between py-3 ${
                                                !isLast ? "border-b border-b-gray-200" : ""
                                            }`}
                                            onPress={() => setManageOpen(key)}
                                        >
                                            <View className="flex flex-row items-center gap-3">
                                                <Text className="text-primary font-semibold text-lg">
                                                    {label}
                                                </Text>
                                            </View>
                                            <Image
                                                source={require("@/assets/icons/right-arrow.png")}
                                                style={{ width: 14, height: 14 }}
                                            />
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </CE_Card>
                    </ScrollView>
                </>
            ) : manageOpen === 'transcation' ? (
                <Suspense fallback={<CE_Loading />}>
                    <ReportTransaction 
                        lang={props.lang}
                        storeId={props.storeId}
                        handleBack={() => setManageOpen('')}
                        setUpAlert={props.setupAlert}
                    />
                </Suspense>
            ) : manageOpen === 'product' ? (
                <Suspense fallback={<CE_Loading />}>
                    <ReportProduct 
                        storeId={props.storeId}
                        handleBack={() => setManageOpen('')}
                        setUpAlert={props.setupAlert}
                        lang={props.lang}
                    />
                </Suspense>
            ) : manageOpen === 'profitloss' ? (
                <Suspense fallback={<CE_Loading />}>
                    <ReportProfitLoss 
                        storeId={props.storeId}
                        handleBack={() => setManageOpen('')}
                        setUpAlert={props.setupAlert}
                        lang={props.lang}
                    />
                </Suspense>
            ) : 
                <Suspense fallback={<CE_Loading />}>
                    <ReportExpense 
                        storeId={props.storeId}
                        handleBack={() => setManageOpen('')}
                        setUpAlert={props.setupAlert}
                        lang={props.lang}
                    />
                </Suspense>
            }

        </View>
    )
}