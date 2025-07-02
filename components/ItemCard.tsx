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
        <View className={`bg-white rounded-2xl p-4 space-y-2 ${className}`}>
            <Image
                source={image}
                className="w-full h-40 rounded-xl"
                resizeMode="cover"
            />
            <Text className="text-primary text-lg font-semibold">{title}</Text>
            <Text className="text-black text-sm font-bold">{price}</Text>
            <Text
                className="text-gray-500 text-xs"
                numberOfLines={2}
                ellipsizeMode="tail"
            >
                {description}
            </Text>
            <CE_Button
                title={buttonLabel}
                onPress={onPressButton}
                className="mt-2"
            />
        </View>
    )
}
