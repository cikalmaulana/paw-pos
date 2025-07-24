import { CE_BackButton } from "@/components/BackButton";
import { I_Lang } from "@/services/api/other/api.language.int";
import { useLang } from "@/services/function/LangContext";
import { useLocale } from "@/services/function/useLocale";
import { ScrollView, Text, View } from "react-native";
import { locales } from "./locales";

interface I_Props {
    lang: I_Lang;
    handleBack: () => void;
}

export default function PrivacyPolicy(props: I_Props) {
    const { lang, setLang } = useLang()
    const language = useLocale(lang, locales)

    return (
        <View>
            <CE_BackButton lable={language.title} onPress={props.handleBack} />

            <Text className="text-2xl font-bold mb-4 mt-4">{language.title}</Text>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 600 }}>
                {language.content.map((item: string, index: number) => (
                    <Text key={index} className="text-base text-gray-700 mb-4">
                        {item}
                    </Text>
                ))}
            </ScrollView>
        </View>
    );
}
