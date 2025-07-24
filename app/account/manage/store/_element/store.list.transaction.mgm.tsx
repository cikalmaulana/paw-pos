import { CE_Button } from "@/components/Button";
import { CE_Card } from "@/components/Card";
import { CE_Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { locales } from "../locales";

interface I_Props{
    language: typeof locales["id"]
    tax: string
    service: string
    handleSelect:(key: string)=>void
    setUpAlert:(msg: string, isSuccess: boolean)=>void
}

export default function StoreTransactionMgmList(props:I_Props){
    const [currencyOpen, setCurrencyOpen] = useState(false)
    const [taxOpen, setTaxOpen] = useState(false)
    const [currency, setCurrency] = useState("IDR")
    const [tax, setTax] = useState(props.tax)
    const [service, setService] = useState(props.service)
    const [firsOpen, setFirstOpen] = useState(true)

    const transactionSettingList = [
        { key: 'tax', label: props.language.list.transaction.label.tax}, //extend
        { key: 'receipt', label: props.language.list.transaction.label.receipt },
        { key: 'discount', label: props.language.list.transaction.label.discount },
        { key: 'currency', label: props.language.list.transaction.label.currency }, //extend
    ]

    useEffect(() => {
        if (firsOpen) {
            setFirstOpen(false)
            return
        }
        doUpdateCurrency()
    }, [currency])
    
    const doUpdateCurrency = async () => {
        setCurrencyOpen(false)
    }

    const doUpdateTaxService = async () => {
        setTaxOpen(false)
    }

    return (
        <View>
            <Text className="text-description mb-2 font-semibold mt-4">{props.language.list.transaction.title}</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col ">
                    {transactionSettingList.map((item, index) => {
                        const isLast = index === transactionSettingList.length - 1;
                        const isCurrency = item.key === 'currency';
                        const isTax = item.key === 'tax';

                        return (
                            <View key={item.key}>
                                <Pressable 
                                    className={`flex flex-row items-center justify-between py-3 ${
                                        !isLast ? "border-b border-b-gray-200" : ""
                                    }`}
                                    onPress={() => {
                                        if (isCurrency) {
                                            setCurrencyOpen(prev => !prev)
                                            return
                                        } 
                                        if (isTax) {
                                            setTaxOpen(prev => !prev)
                                            return
                                        }

                                        props.handleSelect(item.key)
                                    }}
                                >
                                    <View className="flex flex-row items-center gap-3">
                                        <Text className="text-primary font-semibold text-lg">{item.label}</Text>
                                    </View>
                                    <Image 
                                        source={require("@/assets/icons/right-arrow.png")}
                                        style={{ 
                                            width: 14, 
                                            height: 14,
                                            transform: [{ 
                                                rotate: 
                                                    (isCurrency && currencyOpen) || (isTax && taxOpen) 
                                                        ? "90deg" 
                                                        : "0deg" 
                                            }]
                                        }}
                                    />
                                </Pressable>

                                {isCurrency && currencyOpen && (
                                    <View className="mt-3 space-y-4">
                                        <CE_Dropdown
                                            label={props.language.list.transaction.currency}
                                            selected={currency}
                                            options={[
                                                { label: "Rupiah", value: "IDR" },
                                                { label: "USD", value: "USD" }
                                            ]}
                                            onSelect={(val) => setCurrency(val)}
                                        />
                                    </View>
                                )}

                                {isTax && taxOpen && (
                                    <View className="flex flex-col mt-3 gap-3">
                                        <Input 
                                            label={props.language.list.transaction.tax} 
                                            placeholder={props.language.list.transaction.tax}
                                            value={tax} 
                                            onChangeText={val => setTax(val)} 
                                        />
                                        <Input 
                                            label={props.language.list.transaction.service} 
                                            placeholder={props.language.list.transaction.service}
                                            value={service} 
                                            onChangeText={val => setService(val)} 
                                        />
                                        <CE_Button 
                                            title={props.language.button.save}
                                            onPress={() => doUpdateTaxService()}
                                            className="my-3"
                                        />
                                    </View>
                                )}
                            </View>
                        )
                    })}
                </View>
            </CE_Card>
        </View>
    )
}