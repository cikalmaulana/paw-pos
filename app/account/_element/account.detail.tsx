import { I_User } from "@/services/api/api.user.get.int";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface I_Props{
    userData: I_User
    handleBack:()=>void
}

export default function AccountDetails(props: I_Props){
    const [name, setName] = useState(props.userData.name)
    
    return (
        <View>
            <View className="flex flex-row gap-2 items-center mb-8">
                <Text className="text-primary font-bold text-2xl">
                    Edit Profile
                </Text>
                <Pressable onPress={() => props.handleBack()}><Text>Back</Text></Pressable>
            </View>
        </View>
    )
}