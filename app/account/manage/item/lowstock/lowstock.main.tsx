import { CE_BackButton } from "@/components/BackButton";
import { View } from "react-native";

interface I_Props{
    handleBack:()=>void
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
}

export default function LowStockMain(props: I_Props) {
    return (
        <View>
            <CE_BackButton lable="View Low Stock" onPress={() => props.handleBack()}/>
        </View> 
    )
}