import { CE_Card } from "@/components/Card";
import { useEffect, useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { locales } from "../locales";

interface I_Props{
    language: typeof locales["id"]
    setUpAlert:(msg: string, isSuccess: boolean)=>void
}

export default function StoreSetting(props: I_Props){
    const [needOngoing, setNeedOngoing] = useState(false)
    const [needTableNo, setNeedTableNo] = useState(false)

    useEffect(() => {

    }, [])

    const doSetNeedOngoing = async () => { // update db

    }

    const doSetNeedTableNo = async () => { // update db

    }

    return (
        <View>
            <Text className="text-description mb-2 font-semibold mt-4">{props.language.setting.title}</Text>
            <CE_Card className="bg-white !shadow-none p-3">
                <View className="flex flex-col ">
                    <Pressable
                        className={`flex flex-row items-center justify-between py-3 border-b border-b-gray-200`}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Text className="text-primary font-semibold text-lg">{props.language.setting.needongoing}</Text>
                        </View>
                        <Switch
                            value={needOngoing}
                            onValueChange={() => setNeedOngoing(!needOngoing)}
                            thumbColor={needOngoing ? "#10b981" : "#f4f3f4"}
                            trackColor={{ false: "#ccc", true: "#a7f3d0" }}
                        />
                    </Pressable>
                </View>
                <View className="flex flex-col ">
                    <Pressable
                        className={`flex flex-row items-center justify-between py-3`}
                    >
                        <View className="flex flex-row items-center gap-3">
                            <Text className="text-primary font-semibold text-lg">{props.language.setting.needtable}</Text>
                        </View>
                        <Switch
                            value={needTableNo}
                            onValueChange={() => setNeedTableNo(!needTableNo)}
                            thumbColor={needTableNo ? "#10b981" : "#f4f3f4"}
                            trackColor={{ false: "#ccc", true: "#a7f3d0" }}
                        />
                    </Pressable>
                </View>
            </CE_Card>
        </View>
    )
}