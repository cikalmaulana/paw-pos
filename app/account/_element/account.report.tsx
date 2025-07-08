import { CE_BackButton } from "@/components/BackButton";
import { View } from "react-native";

interface I_Props {
    handleBack:()=>void
}

export function AccountReport(props: I_Props){
    return (
        <View>
            <CE_BackButton lable="Report" onPress={props.handleBack}/>
        </View>
    )
}