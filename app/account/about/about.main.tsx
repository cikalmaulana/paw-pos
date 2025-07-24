import { CE_BackButton } from "@/components/BackButton";
import { I_Lang } from "@/services/api/other/api.language.int";
import { useLang } from "@/services/function/LangContext";
import { useLocale } from "@/services/function/useLocale";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { locales } from "./locales";

interface I_Props {
    lang: I_Lang;
    handleBack: () => void;
}

export default function AboutPage(props: I_Props) {
    const { lang, setLang } = useLang()
    const language = useLocale(lang, locales)

    const handleOpenLink = (value: string) => {
        if (value.startsWith("http") || value.startsWith("mailto")) {
            Linking.openURL(value);
        } else if (value.includes("@")) {
            Linking.openURL(`mailto:${value}`);
        } else if (value.startsWith("@")) {
        Linking.openURL(`https://instagram.com/${value.replace("@", "")}`);
        } else {
            Linking.openURL(`https://facebook.com/${value.replace(/\s/g, "")}`);
        }
    };

    return (
        <View>
            <CE_BackButton lable={language.title} onPress={props.handleBack} />

            <Text className="text-2xl font-bold mt-4 mb-2">{language.title}</Text>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 600 }}>
                {language.content.map((item: string, idx: number) => (
                    <Text key={idx} className="text-base text-gray-700 mb-3">
                        {item}
                    </Text>
                ))}

                <View className="mt-6">
                    <Text className="text-lg font-semibold text-gray-900 mb-2">
                        {language.contactTitle}
                    </Text>

                    {language.socials.map((social: { label: string; value: string }, index: number) => (
                        <TouchableOpacity key={index} onPress={() => handleOpenLink(social.value)}>
                            <View className="mb-3">
                                <Text className="text-sm font-semibold text-gray-900">{social.label}</Text>
                                <Text className="text-sm text-blue-700 underline">{social.value}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
