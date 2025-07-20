import { CE_BackButton } from "@/components/BackButton";
import { I_Lang } from "@/services/api/other/api.language.int";
import { useLocale } from "@/services/function/useLocale";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { locales } from "./locales";

interface I_Props {
    lang: I_Lang;
    handleBack: () => void;
}

export default function ContactSupport(props: I_Props) {
    const [lang] = useState(props.lang);
    const language = useLocale(lang, locales);

    return (
        <View>
            <CE_BackButton lable={language.title} onPress={props.handleBack} />

            <Text className="text-2xl font-bold mt-4 mb-4">{language.title}</Text>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 600 }}>
                {language.content.map((item: string, idx: number) => (
                    <Text key={idx} className="text-base text-gray-700 mb-3">
                        {item}
                    </Text>
                ))}

                <View className="mt-4">
                    {language.contactMethods.map((method: { label: string; value: string }, index: number) => (
                        <View key={index} className="mb-3">
                            <Text className="text-sm font-semibold text-gray-900">{method.label}</Text>
                            <Text className="text-sm text-gray-700">{method.value}</Text>
                        </View>
                    ))}
                </View>

                <View className="mt-6">
                <Text className="text-lg font-semibold text-gray-900 mb-2">Tips:</Text>
                    {language.tips.map((tip: string, idx: number) => (
                        <Text key={idx} className="text-sm text-gray-700 mb-2">• {tip}</Text>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
