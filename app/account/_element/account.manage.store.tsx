import { CE_BackButton } from "@/components/BackButton";
import { View } from "react-native";

interface I_Props {
    handleBack:()=>void
}

export default function ManageStore(props: I_Props){
    return (
        <View>
            <CE_BackButton lable="Manage Store" onPress={props.handleBack}/>
        </View>
    )
}