import { CE_Button } from "@/components/Button"
import { Image, Modal, Text, View } from "react-native"

export interface I_Props {
    isOpen: boolean
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    name?: string
    danger?: boolean
    variant?: "warning" | "failed" | "success"
    setIsOpen: (open: boolean) => void
    onConfirm: () => void
    onCancel?:() => void
}

const getImageSource = (variant?: "warning" | "failed" | "success") => {
    switch (variant) {
        case "warning":
            return require("@/assets/icons/warning.png")
        case "failed":
            return require("@/assets/icons/cross.png")
        case "success":
            return require("@/assets/icons/check.png") 
        default:
            return null
    }
}

export default function CE_ModalConfirmation(props: I_Props) {
    if (!props.isOpen) return null

    const imageSource = getImageSource(props.variant)

    return (
        <Modal
            visible={props.isOpen}
            transparent
            animationType="fade"
            onRequestClose={() => props.setIsOpen(false)}
        >
            <View className="flex-1 bg-black/50 justify-center items-center px-6">
                <View className="bg-white p-6 rounded-xl w-full max-w-md">

                    <Text className="text-center text-xl font-bold mb-4">
                        {props.title}
                    </Text>

                    {imageSource && (
                        <View className="w-full items-center justify-center mb-4">
                            <Image
                                source={imageSource}
                                style={{ width: 52, height: 52 }}
                            />
                        </View>
                    )}

                    {props.name && (
                        <Text className="text-center text-base font-semibold mb-1">
                            {props.name}
                        </Text>
                    )}

                    <Text className={`text-center text-sm mb-5 ${props.danger ? "text-danger" : "text-description"}`}>
                        {props.description}
                    </Text>

                    <View className="flex-row gap-3">
                        <CE_Button
                            title={props.cancelText || "Cancel"}
                            onPress={() => {
                                props.onCancel ?? props.setIsOpen(false)
                            }}
                            className="flex-1"
                        />
                        <CE_Button
                            title={props.confirmText || "Confirm"}
                            onPress={props.onConfirm}
                            className="flex-1"
                            bgColor={props.danger ? "bg-danger" : undefined}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}