import { Ionicons } from "@expo/vector-icons"; // bisa juga lucide atau feather, bebas
import React from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
    checked: boolean
    label: string
    onChange: () => void
    className?: string
}

export function CE_Checkbox({ checked, label, className, onChange }: Props) {
    return (
        <Pressable onPress={onChange} className={`flex-row items-center space-x-2 ${className}`}>
            <View className="w-5 h-5 rounded-sm border border-gray-400 items-center justify-center bg-white">
                {checked && <Ionicons name="checkmark" size={16} color="black" />}
            </View>
            <Text className="text-sm text-black">{label}</Text>
        </Pressable>
    )
}
