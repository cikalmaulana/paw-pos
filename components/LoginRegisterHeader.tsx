import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

interface Props {
    title: string
    children: ReactNode
    className?: string
    modalOpen: boolean
    openModalChangeLang:(open: boolean)=>void
}

export function LoginRegisterLayout({ title, children, className, modalOpen, openModalChangeLang }: Props) {
    return (
        <SafeAreaView className={`flex-1 bg-background ${className}`}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={10}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 24, // px-6
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-1 pt-32 pb-10">
                    <View className="absolute top-6 right-6 z-10">
                        <Pressable onPress={() => openModalChangeLang(!modalOpen)}>
                            <Text className="text-primary text-sm">🌐 EN</Text>
                        </Pressable>
                    </View>
                    <Text className="text-7xl text-primary font-bold mb-10">{title}</Text>
                        {children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
