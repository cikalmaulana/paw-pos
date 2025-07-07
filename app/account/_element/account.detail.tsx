import { I_User } from "@/services/api/api.user.get.int";
import { View } from "lucide-react-native";
import { useState } from "react";

interface I_Props{
    userData: I_User
}

export default function AccountDetails(props: I_Props){
    const [name, setName] = useState(props.userData.name)
    
    return (
        <View>
            {/* <CE_Button title="Edit" onPress={} /> */}
        </View>
    )
}