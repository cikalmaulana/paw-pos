import { CE_BackButton } from "@/components/BackButton";
import { View } from "react-native";

interface I_Props {
    handleBack:()=>void
}

export function ManageAdmin(props: I_Props){
    return (
        <View>
            <CE_BackButton lable="Manage Admin" onPress={props.handleBack}/>
        </View>
    )
}