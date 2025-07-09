import { Image, Text, View } from "react-native"

interface I_Props{
    label?: string
    className?: string
}

export function FailedGetData(props: I_Props){
    return (
        <View className={`${props.className} flex flex-col w-full p-5 justify-start items-center`}>
            <Image 
                source={require('@/assets/icons/confuse.png')}
                style={{width: 38, height: 38}}
            />
            <Text className="font-bold text-danger text-3xl">{props.label ?? "Failed to get data. Please Re-Open Application"}</Text>
        </View>
    )
}