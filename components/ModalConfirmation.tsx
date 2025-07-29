import { CE_Button } from "@/components/Button"
import { globalEmitter } from "@/services/function/globalEmitter"
import { useEffect, useState } from "react"
import { ActivityIndicator, Image, Modal, Text, View } from "react-native"
export interface I_Props {
    eventName: string
    defaultOpen?: boolean
}
export interface ModalData {
    id?: string
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    name?: string
    danger?: boolean
    variant?: "warning" | "failed" | "success"
    onConfirm: (onClose: () => void) => void | Promise<void>
    onCancel?: (onClose: () => void) => void | Promise<void>
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
export default function CE_ModalConfirmation({ eventName }: I_Props) {
    const [modalData, setModalData] = useState<ModalData | null>(null)
    const [loadingConfirm, setLoadingConfirm] = useState(false)
    const [loadingCancel, setLoadingCancel] = useState(false)
    const [visible, setVisible] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [lastModalId, setLastModalId] = useState<string | null>(null)

    // Consider removing this useEffect if it's only for logging, or make it more robust for debugging.
    useEffect(() => {
        console.log("visible", visible, "modalData", modalData, "isClosing", isClosing);
    }, [visible, modalData, isClosing]);

    useEffect(() => {
        const listener = (data: ModalData) => {
            if (isClosing) {
                setModalData(null);
                setVisible(false); 
                setIsClosing(false);
                setLastModalId(null);

                setTimeout(() => {
                    setModalData(data);
                    setVisible(true);
                    setLastModalId(data.id || null);
                }, 100);
                return;
            }

            if (data.id && data.id === lastModalId && visible) {
                console.log("Preventing duplicate modal open while visible");
                return;
            }

            setModalData(data);
            setVisible(true);
            setLastModalId(data.id || null);
        };

        globalEmitter.on(eventName, listener);
        return () => globalEmitter.off(eventName, listener);
    }, [eventName, isClosing, visible, lastModalId]);

    const closeModal = () => {
        if (isClosing) return; 
        setIsClosing(true);
        setVisible(false); 

        setTimeout(() => {
            setModalData(null); 
            setLoadingConfirm(false);
            setLoadingCancel(false);
            setIsClosing(false)
            setLastModalId(null);
        }, 300)
    }

    if (!visible && !isClosing) return null

    const {
        title,
        description,
        confirmText,
        cancelText,
        name,
        danger,
        variant,
        onConfirm,
        onCancel,
    } = modalData || {}

    const imageSource = getImageSource(variant);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={closeModal}
        >
            {modalData && (
                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                    <View className="bg-white p-6 rounded-xl w-full max-w-md">
                        <Text className="text-center text-xl font-bold mb-4">{title}</Text>
                        {imageSource && (
                            <View className="w-full items-center justify-center mb-4">
                                <Image source={imageSource} style={{ width: 52, height: 52 }} />
                            </View>
                        )}
                        {name && (
                            <Text className="text-center text-base font-semibold mb-1">{name}</Text>
                        )}
                        <Text className={`text-center text-sm mb-5 ${danger ? "text-danger" : "text-description"}`}>
                            {description}
                        </Text>
                        <View className="flex-row gap-3">
                            <CE_Button
                                title={loadingCancel ? "" : cancelText || "Cancel"}
                                onPress={async () => {
                                    if (onCancel) {
                                        setLoadingCancel(true);
                                        await onCancel(closeModal);
                                    } else {
                                        closeModal();
                                    }
                                }}
                                className="flex-1"
                                disabled={loadingCancel || loadingConfirm}
                            >
                                {loadingCancel && <ActivityIndicator size="small" color="#000" />}
                            </CE_Button>
                            <CE_Button
                                title={loadingConfirm ? "" : confirmText || "Confirm"}
                                onPress={async () => {
                                    if (onConfirm) {
                                        setLoadingConfirm(true);
                                        await onConfirm(closeModal);
                                    } else {
                                        closeModal();
                                    }
                                }}
                                className="flex-1"
                                disabled={loadingConfirm || loadingCancel}
                                bgColor={danger ? "bg-danger" : "bg-secondary"}
                            >
                                {loadingConfirm && <ActivityIndicator size="small" color="#fff" />}
                            </CE_Button>
                        </View>
                    </View>
                </View>
            )}
        </Modal>
    );
}