import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CE_AlertProps {
    message: string;
    isSuccess: boolean;
    showAlert: boolean;
    onClose?: () => void;
    className?: string
}

export function CE_Alert({ message, isSuccess, showAlert, onClose, className }: CE_AlertProps) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;
    const [visible, setVisible] = useState(showAlert);

    useEffect(() => {
        if (showAlert) {
        setVisible(true);
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            handleClose();
        }, 10000);

        return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -20,
                duration: 250,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => {
            setVisible(false);
            onClose?.();
        });
    };

    if (!visible) return null;

    return (
        <SafeAreaView className={`absolute top-0 left-0 right-0 z-50 ${className}`}>
            <Animated.View
                style={{
                    opacity,
                    transform: [{ translateY }],
                }}
                className={`mx-4 mt-2 flex-row items-center justify-between px-4 py-3 rounded-full ${
                    isSuccess ? "bg-success" : "bg-danger"
                }`}
            >
                <View className="flex-row items-center gap-2">
                    <Text className="text-white text-lg font-bold">
                        {isSuccess ? "V" : "X"}
                    </Text>
                    <Text className="text-white text-sm">{message}</Text>
                </View>
                <Pressable onPress={handleClose}>
                    <Text className="text-white font-bold">×</Text>
                </Pressable>
            </Animated.View>
        </SafeAreaView>
    );
}
