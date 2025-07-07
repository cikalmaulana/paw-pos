import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { I_User } from "@/services/api/api.user.get.int";
import { View } from "react-native";

interface I_Props{
    user: I_User
}

export default function LoginMembershipExpired(props: I_Props){ // condition : isMember false && member_type '' && 
    return (
        <LoginRegisterLayout title="Membership Plan">
            <View>
                
            </View>
        </LoginRegisterLayout>
    )
}