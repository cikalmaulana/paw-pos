import { Image, Pressable, Text } from "react-native"

interface I_Props{
    lable: string
    onPress:()=>void
}

export function CE_BackButton(props: I_Props) {
    return (
        <Pressable className="flex flex-row gap-2 items-center mb-8" onPress={() => props.onPress()}>
            <Image 
                source={require("@/assets/icons/backward.png")}
                style={{width: 24, height: 24 }}
            />
            <Text className="text-primary font-bold text-2xl">
                {props.lable}
            </Text>
        </Pressable>
    )
}