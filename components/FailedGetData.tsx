import { Image, Text, View } from "react-native"

interface I_Props {
    label?: string
    className?: string
}

export function FailedGetData(props: I_Props) {
    return (
        <View
            className={`${props.className} flex-1 justify-center items-center px-5`}
        >
            <Image
                source={require('@/assets/icons/confuse.png')}
                style={{ width: 120, height: 120 }}
            />
            <Text
                className="font-bold text-danger text-lg mx-2 mt-4 text-center"
                style={{ textAlign: 'center' }}
            >
                {props.label ?? "Failed to get data. Please Refresh or Re-Open Application"}
            </Text>
        </View>
    )
}
