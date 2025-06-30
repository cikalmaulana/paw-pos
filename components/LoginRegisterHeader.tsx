import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from "react-native";

interface Props {
    title: string
    children: ReactNode
    className?: string
}

export function LoginRegisterLayout({ title, children, className }: Props) {
    return (
        <SafeAreaView className={`flex-1 bg-background ${className}`}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={10}
            >
                <ScrollView
                    className="px-6"
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    
                >
                    <View className="flex-1 pt-32 pb-10">
                    <Text className="text-7xl text-primary font-bold mb-10">{title}</Text>
                        {children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
