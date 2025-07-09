import { priceFormat } from "@/services/function/formatPrice"
import React from "react"
import { Image, Text, View } from "react-native"
import { CE_Button } from "./Button"

interface I_Props {
    image: number 
    title: string
    price: string
    description: string
    buttonLabel: "Add" | "Edit"
    onPressButton: () => void
    className?: string
    stock?: string
}

export function CE_ItemCard({
    image,
    title,
    price,
    description,
    buttonLabel,
    onPressButton,
    className,
}: I_Props) {
    return (
        <View className={`bg-white rounded-2xl p-4 h-[325px] ${className}`}>
            <View className="flex-1 justify-between space-y-2">
                <View>
                    <Image
                        source={image}
                        className="w-full h-40 rounded-xl mb-2"
                        resizeMode="cover"
                    />
                    <Text 
                        className="text-primary text-lg font-bold mb-1" 
                        numberOfLines={2}
                        style={{ lineHeight: 22 }} 
                    >
                        {title}
                    </Text>
                    <Text className="text-black text-sm font-bold mb-1">{price}</Text>
                    <Text
                        className="text-gray-500 text-xs"
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {description}
                    </Text>
                </View>

                <CE_Button title={buttonLabel} onPress={onPressButton} className="mt-2" />
            </View>
        </View>
    )
}

interface I_HorizontalCardProps{
    image: number 
    title: string
    price: string
    stock: number
    className?: string
    deleteOnClick: () => void
    editOnClick: () => void
}

export function CE_ItemCardHorizontal({
    image,
    title,
    price,
    deleteOnClick,
    editOnClick,
    className,
    stock,
}: I_HorizontalCardProps) {
    return (
        <View className={`bg-white rounded-2xl p-4 h-36 ${className}`}>
            <View className="flex flex-1 flex-row gap-4">
                <Image
                    source={image}
                    className="w-28 h-28 rounded-xl mb-2"
                    resizeMode="cover"
                />
                <View className="flex flex-col">
                    <Text 
                        className="text-primary text-lg font-bold mb-1" 
                        numberOfLines={2}
                        style={{ lineHeight: 22 }} 
                    >
                        {title}
                    </Text>
                    <Text className="text-black text-sm font-bold mb-1">{priceFormat(price, "IDR")}</Text>
                    <Text className="text-sm font-semibold mb-1">{stock} pcs</Text>
                    <View className="flex flex-row justify-between gap-2 mt-1">
                        <CE_Button 
                            title="Delete" 
                            className="!py-2 !px-4 justify-center items-center" 
                            btnClassName="!text-sm"
                            bgColor="bg-danger"
                            onPress={() => deleteOnClick()}
                        />
                        <CE_Button 
                            title="Edit Item" 
                            className="!py-2 !px-4 justify-center items-center" 
                            btnClassName="!text-sm"
                            onPress={() => editOnClick()}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

