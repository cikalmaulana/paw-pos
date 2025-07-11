import { Eye, EyeOff } from "lucide-react-native"
import { useEffect, useState } from "react"
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { CE_Button } from "./Button"

interface Props extends TextInputProps {
    label: string
    optional?: boolean
    type?: "text" | "password" | "number"
    stepperButtons?: boolean
}

export function Input({ label, type = "text", stepperButtons = false, ...props }: Props) {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const isPasswordType = type === "password"
    const isNumberType = type === "number" && stepperButtons

    const [value, setValue] = useState(String(props.value ?? ''))

    const handleIncrement = () => {
        const num = getSafeNumber(value)
        const newValue = num + 1
        setValue(String(newValue))
        props.onChangeText?.(String(newValue))
    }

    const handleDecrement = () => {
        const num = Number(value)
        const newValue = isNaN(num) ? 0 : num - 1
        setValue(String(newValue))
        props.onChangeText?.(String(newValue))
    }

    const getSafeNumber = (val: string) => {
        const parsed = Number(val)
        return isNaN(parsed) ? 0 : parsed
    }

    useEffect(() => {
        if (type === "number" && stepperButtons) {
            setValue(String(props.value ?? ''))
        }
    }, [props.value, type, stepperButtons])

    return (
        <View className="flex flex-col w-full gap-2">
            <View className="flex flex-row w-full">
                <Text className="text-base text-primary font-semibold">{label}</Text>
                {props.optional && (<Text className="ms-1 text-sm text-gray-400 font-semibold">*optional</Text>)}
            </View>

            <View className="relative w-full flex-row items-center">
                <TextInput
                    className={`flex-1 border rounded-2xl px-4 py-3 ${isPasswordType || isNumberType ? 'pr-20' : ''} border-primary text-black bg-white`}
                    placeholderTextColor="#999"
                    secureTextEntry={isPasswordType && !isPasswordVisible}
                    keyboardType={type === 'number' ? 'numeric' : 'default'}
                    value={value}
                    onChangeText={(text) => {
                        setValue(text)
                        props.onChangeText?.(text)
                    }}
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

                {isNumberType && (
                    <View className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-row gap-1">
                        <CE_Button 
                            title="-" 
                            className="!py-1 !px-5 !h-8" 
                            btnClassName="text-sm !text-white" 
                            onPress={handleDecrement}
                            bgColor="bg-danger"
                        />
                        <CE_Button 
                            title="+" 
                            className="!py-1 !px-5 !h-8" 
                            btnClassName="text-sm" 
                            onPress={handleIncrement}
                        />
                    </View>
                )}
            </View>
        </View>
    )
}