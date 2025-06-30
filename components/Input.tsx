import { Eye, EyeOff } from "lucide-react-native"
import { useState } from "react"
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native"

interface Props extends TextInputProps {
    label: string
    type?: "text" | "password"
}

export function Input({ label, type = "text", ...props }: Props) {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const isPasswordType = type === "password"

    return (
        <View className="flex flex-col w-full gap-2">
            <View className="w-full">
                <Text className="text-base text-primary font-semibold">{label}</Text>
            </View>

            <View className="relative w-full">
                <TextInput
                    className="w-full border rounded-2xl py-4 px-4 pr-12 border-primary text-black bg-white"
                    placeholderTextColor="#999"
                    secureTextEntry={isPasswordType && !isPasswordVisible}
                    {...props}
                />

                {isPasswordType && (
                    <TouchableOpacity
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        onPress={() => setPasswordVisible((prev) => !prev)}
                    >
                        {isPasswordVisible ? (
                            <Eye className="text-gray-500" size={20} />
                            ) : (
                            <EyeOff className="text-gray-500" size={20} />
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
