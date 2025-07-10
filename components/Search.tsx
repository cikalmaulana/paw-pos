import SearchIcon from "@/assets/icons/search.png"; // pastikan icon ada
import { Image, Pressable, Text, TextInput, TextInputProps, View } from "react-native";

interface I_Props extends TextInputProps {
    value: string
    onChangeText: (text: string) => void
    placeholder?: string
    className?: string
}

export function CE_Search({ value, onChangeText, placeholder = "Search...", className, ...props }: I_Props) {
    return (
        <View className={`flex flex-row items-center bg-white rounded-2xl px-4 py-3 h-12 shadow-md border-none ${className}`} >
            <Image
                source={SearchIcon}
                style={{ width: 18, height: 18, marginRight: 8 }}
                resizeMode="contain"
            />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#A0A0A0"
                style={{
                    flex: 1,
                    fontSize: 16,
                    color: "black",
                    padding: 0,
                    textAlignVertical: "center",
                }}
                {...props}
            />

            {value.length > 0 && (
                <Pressable onPress={() => onChangeText("")} className="flex items-center justify-center h-full mb-1">
                    <Text className="text-gray-400 text-lg ml-2 font-bold">X</Text>
                </Pressable>
            )}
        </View>
    );
}
