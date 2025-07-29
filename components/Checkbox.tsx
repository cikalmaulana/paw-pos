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
        <Pressable 
            onPress={onChange} 
            className={`flex-row items-center gap-2 ${className}`}
        >
            <View 
                className={`w-5 h-5 rounded-md border items-center justify-center transition-colors ${
                    checked 
                        ? "bg-primary border-primary" 
                        : "bg-white border-gray-400"
                }`}
            >
                {checked && (
                    <Text className="text-white text-xs font-bold select-none">✓</Text>
                )}
            </View>
            <Text className="text-sm text-black">{label}</Text>
        </Pressable>
    )
}