import { Text, TouchableOpacity, View } from "react-native"

interface Props {
    value: string
    className?: string
    onRefresh: () => void
}

export function CaptchaBox({ value, className, onRefresh }: Props) {
    const colors = ["#1f2937", "#4b5563", "#065f46", "#7c3aed", "#dc2626", "#0ea5e9"]

    return (
        <View className={`flex-row items-center mb-3 ${className}`}>
            <View className="flex-row bg-gray-100 rounded-lg px-4 py-3 mr-4 border border-gray-300">
                {value.split("").map((char, idx) => (
                <Text
                    key={idx}
                    style={{
                    fontSize: Math.floor(Math.random() * 6) + 20, 
                    fontWeight: "bold",
                    color: colors[idx % colors.length],
                    transform: [{ rotate: `${Math.floor(Math.random() * 21) - 10}deg` }], 
                    marginHorizontal: 1,
                    fontStyle: idx % 2 === 0 ? "italic" : "normal",
                    }}
                >
                    {char}
                </Text>
                ))}
            </View>

            <TouchableOpacity onPress={onRefresh}>
                <Text className="text-blue-600 underline">Reload</Text>
            </TouchableOpacity>
        </View>
    )
}
