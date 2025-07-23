import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import * as Clipboard from "expo-clipboard"; // optional kalau kamu pakai expo
import { useState } from "react";
import { ActivityIndicator, Alert, Modal, Pressable, Text, View } from "react-native";
import { locales } from "../locales";

interface I_Props {
    language: typeof locales["id"]
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export default function AddAdminModal(props: I_Props) {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [otpCode, setOtpCode] = useState("")

    const handleAddAdmin = () => {
        if (!phoneNumber.startsWith("08")) {
            setError("Phone number must start with 08")
            return
        }

        setError("")
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            setOtpCode(generateOtp())
        }, 1000)
    }

    const generateOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    const handleClose = () => {
        setPhoneNumber("")
        setError("")
        setIsLoading(false)
        setOtpCode("")
        props.setIsOpen(false)
    }

    const handleCopy = () => {
        Clipboard.setStringAsync(otpCode)
        Alert.alert("Copied", "Code has been copied to clipboard")
    }

    if (!props.isOpen) return null

    return (
        <Modal
            visible={props.isOpen}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View className="flex-1 bg-black/50 justify-center items-center px-6">
                <View className="bg-white p-6 rounded-xl w-full max-w-md">
                    <Text className="text-center text-xl font-bold mb-4">
                        {props.language.modal.title}
                    </Text>

                    {isLoading ? (
                        <View className="items-center justify-center gap-3">
                            <ActivityIndicator size="large" color="#000" />
                            <Text className="text-sm font-medium text-description">
                                {props.language.modal.generateotp}...
                            </Text>
                        </View>
                    ) : otpCode !== '' ? (
                        <>
                            <Text className="text-center text-3xl font-bold mb-3">{otpCode}</Text>
                            <Pressable onPress={handleCopy}>
                                <Text className="text-center text-secondary font-semibold mb-5">
                                    {props.language.modal.copycode}
                                </Text>
                            </Pressable>
                            <Text className="text-danger text-center font-semibold text-sm mb-6">
                                {props.language.modal.hint}
                            </Text>
                            <CE_Button
                                title={props.language.button.close}
                                onPress={handleClose}
                            />
                        </>
                    ) : (
                        <>
                            <Input
                                label={props.language.modal.phone}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="numeric"
                                type="number"
                                placeholder="e.g. 081234567890"
                            />
                            {error !== "" && (
                                <Text className="text-danger text-sm mt-1">{error}</Text>
                            )}

                            <View className="flex-row gap-3 mt-6">
                                <CE_Button
                                    title={props.language.button.cancel}
                                    onPress={handleClose}
                                    className="flex-1"
                                    disabled={isLoading}
                                />
                                <CE_Button
                                    title={props.language.button.addshort}
                                    bgColor="bg-secondary"
                                    onPress={handleAddAdmin}
                                    className="flex-1"
                                    disabled={isLoading}
                                />
                            </View>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    )
}
