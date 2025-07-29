import { globalEmitter, TAlertPayload } from "@/services/function/globalEmitter";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    Image,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface I_Props{
    name: string
}

export function CE_Alert(props: I_Props) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(true);

    useEffect(() => {
        const showAlert = ({ message, isSuccess = true }: TAlertPayload) => {
            setMessage(message);
            setIsSuccess(isSuccess);
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
            }, 5000);

            return () => clearTimeout(timer);
        };

        globalEmitter.on(props.name, showAlert);
        return () => {
            globalEmitter.off(props.name, showAlert);
        };
    }, []);

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
        });
    };

    if (!visible) return null;

    return (
        <SafeAreaView className="absolute top-0 left-0 right-0 z-50">
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
                    <Image 
                        source={isSuccess ? require("@/assets/icons/check.png") : require("@/assets/icons/warning.png")}
                        style={{width:18, height:18}}
                    />
                    <Text className="text-white text-sm font-semibold">{message}</Text>
                </View>
                <Pressable onPress={handleClose} className="px-3">
                    <Text className="text-white font-bold">X</Text>
                </Pressable>
            </Animated.View>
        </SafeAreaView>
    );
}
