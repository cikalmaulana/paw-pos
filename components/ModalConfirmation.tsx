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
            // If a modal is currently closing, we need to ensure its data is cleared
            // before we attempt to show a new one.
            if (isClosing) {
                console.log("Modal is closing, handling new modal event...");
                // Immediately clear the old modal data to prevent flicker
                setModalData(null);
                setVisible(false); // Ensure visibility is false for the brief moment the old data is null
                setIsClosing(false); // Reset closing state for the new modal
                setLastModalId(null); // Clear last ID

                // Then, open the new modal after a short delay to allow UI to settle
                setTimeout(() => {
                    setModalData(data);
                    setVisible(true);
                    setLastModalId(data.id || null);
                }, 100); // A shorter delay might be sufficient here, test this value.
                return;
            }

            // Prevent opening the same modal again if it's already visible and has the same ID
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
    }, [eventName, isClosing, visible, lastModalId]); // Dependencies remain the same

    const closeModal = () => {
        if (isClosing) return; // Prevent multiple close calls
        setIsClosing(true);
        setVisible(false); // Start the fade-out animation

        // After the animation duration, clear the data and reset states
        setTimeout(() => {
            setModalData(null); // This is the crucial part that removes the content
            setLoadingConfirm(false);
            setLoadingCancel(false);
            setIsClosing(false); // Reset isClosing after all clean-up
            setLastModalId(null);
        }, 300); // This duration should match your animationOut duration if you had one.
    };

    // Render the modal only if visible is true, even if modalData is temporarily null
    // This allows the animationType="fade" to work correctly during close.
    if (!visible && !isClosing) return null; // Only return null if totally inactive

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
    } = modalData || {}; // Use optional chaining or default empty object for destructuring

    const imageSource = getImageSource(variant);

    return (
        <Modal
            visible={visible} // Use the `visible` state directly for the Modal prop
            transparent
            animationType="fade"
            onRequestClose={closeModal}
        >
            {/* Only render content if modalData exists to prevent rendering null/undefined properties */}
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