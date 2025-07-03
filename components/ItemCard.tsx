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
