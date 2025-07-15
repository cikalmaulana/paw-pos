import { CE_Card } from "@/components/Card";
import { I_Lang } from "@/services/api/other/api.language.int";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { locales } from "../locales";

interface I_Props{
    lang:I_Lang
    setManageOpen:(manage: string) => void
    doLogout:()=>void
}

export default function AccountSettingList(props: I_Props){
    const lang = getLocale(props.lang)
    
    function getLocale(lang: I_Lang): typeof locales["en"] {
        return locales[lang.name.toLowerCase() as "en" | "id"]
    }

    const manageAccStoreIcons: { [key: string]: any } = {
        detail: require("@/assets/icons/user2.png"),
        item: require("@/assets/icons/items.png"),
        admin: require("@/assets/icons/admins.png"),
        store: require("@/assets/icons/store.png"),
        report: require("@/assets/icons/report.png"),
    }

    const moreIcons: { [key: string]: any } = {
        lang: require("@/assets/icons/language.png"),
        pin: require("@/assets/icons/padlock.png"),
        privacypolicy: require("@/assets/icons/policy.png"),
        cs: require("@/assets/icons/customer-service.png"),
        about: require("@/assets/icons/about.png"),
    }


    return (
        <ScrollView className="flex flex-col gap-3" contentContainerStyle={{ paddingBottom: 500 }}>
            <Text className="text-description mb-2 font-semibold">{lang.section.manageTitle}</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col ">
                {lang.menu.manageAccStoreList.map((item, index) => {
                    const isLast = index === lang.menu.manageAccStoreList.length - 1;
                    return (
                        <Pressable
                            key={item.key}
                            className={`flex flex-row items-center justify-between py-3 ${
                                !isLast ? "border-b border-b-gray-200" : ""
                            }`}
                            onPress={() => props.setManageOpen(item.key)}
                        >
                            <View className="flex flex-row items-center gap-3">
                                <Image
                                    source={manageAccStoreIcons[item.key]}
                                    style={{ width: 18, height: 18 }}
                                />
                                <Text className="text-primary font-semibold text-lg">
                                    {item.label}
                                </Text>
                            </View>
                            <Image
                                source={require("@/assets/icons/right-arrow.png")}
                                style={{ width: 14, height: 14 }}
                            />
                        </Pressable>
                    );
                })}
                </View>
            </CE_Card>

            <Text className="text-description mb-2 font-semibold mt-5">{lang.section.moreTitle}</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col ">
                    {lang.menu.moreList.map((item, index) => {
                        const isLast = index === lang.menu.manageAccStoreList.length - 1;
                        return (
                            <Pressable
                                key={item.key}
                                className={`flex flex-row items-center justify-between py-3 ${
                                    !isLast ? "border-b border-b-gray-200" : ""
                                }`}
                                onPress={() => props.setManageOpen(item.key)}
                            >
                                <View className="flex flex-row items-center gap-3">
                                    <Image
                                        source={moreIcons[item.key]}
                                        style={{ width: 18, height: 18 }}
                                    />
                                    <Text className="text-primary font-semibold text-lg">
                                        {item.label}
                                    </Text>
                                </View>
                                <Image
                                    source={require("@/assets/icons/right-arrow.png")}
                                    style={{ width: 14, height: 14 }}
                                />
                            </Pressable>
                        );
                    })}
                </View>
            </CE_Card>

            <Pressable className="mt-10 items-center" onPress={() => props.doLogout()}>
                <Text className="text-danger text-lg font-semibold">{lang.logout.buttonLogout}</Text>
            </Pressable>

            <View className="w-full items-center mt-2 mb-10">
                <Text className="text-description text-lg font-semibold">
                    {lang.section.version}
                </Text>
            </View>
        </ScrollView>
    )
}