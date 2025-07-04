import { ActivityIndicator, Text, View } from "react-native";

interface I_Props{
    text?: string
}

export function CE_Loading(props: I_Props){
    return (
        <View className="flex w-full items-center justify-center mt-12">
            <ActivityIndicator size="large" color="#16B8A8" />
            <Text>{props.text ?? "Loading data..."}</Text>
        </View>
    )
}