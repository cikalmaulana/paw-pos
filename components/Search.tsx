import SearchIcon from "@/assets/icons/search.png"; // pastikan icon ada
import { Image, TextInput, TextInputProps, View } from "react-native";

interface I_Props extends TextInputProps {
    value: string
    onChangeText: (text: string) => void
    placeholder?: string
    className?: string
}

export function CE_Search({ value, onChangeText, placeholder = "Search...", className, ...props }: I_Props) {
    return (
        <View className={`flex-row items-center bg-white rounded-2xl px-4 py-3 h-12 shadow-md border-none ${className}`} >
            <Image
                source={SearchIcon}
                style={{ width: 20, height: 20, marginRight: 8 }}
                resizeMode="contain"
            />
            <TextInput
                className="flex-1 text-base text-black"
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#A0A0A0"
                {...props}
            />
        </View>
    );
}
