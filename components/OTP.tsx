import { useRef, useState } from "react"
import { TextInput, TextInputProps, View } from "react-native"

interface Props extends TextInputProps {
    setOtp: (otp: string) => void
    isLoading?: boolean
}

export function OTPInput(props: Props) {
    const [otp, setOtp] = useState(["", "", "", ""])
    const inputsRef = useRef<TextInput[]>([])

    const handleChange = (text: string, index: number) => {
        if (text.length > 1) {
            const chars = text.split("").slice(0, 4)
            setOtp(chars)
            props.setOtp(chars.join(""))
            chars.forEach((char, i) => {
                inputsRef.current[i]?.setNativeProps({ text: char })
            })
            return
        }

        const newOtp = [...otp]
        newOtp[index] = text
        setOtp(newOtp)
        props.setOtp(newOtp.join(""))

        if (text && index < 3) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleBackspace = (index: number) => {
        if (otp[index] === "" && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    return (
        <View className="flex-row justify-center gap-4">
            {otp.map((value, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => {
                        if (ref) inputsRef.current[index] = ref
                    }}
                    value={value}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === "Backspace") {
                            handleBackspace(index)
                        }
                    }}
                    keyboardType="numeric"
                    maxLength={1}
                    editable={!props.isLoading} // ⬅️ Tambahin ini
                    className={`w-16 h-16 border-2 rounded-xl text-center text-xl text-black ${
                        props.isLoading ? 'border-gray-300 bg-gray-100 text-gray-400' : 'border-primary'
                    }`}
                    {...props}
            />
            ))}
        </View>
    )
}
