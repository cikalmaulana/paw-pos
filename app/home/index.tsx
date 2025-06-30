import { CE_Button } from "@/components/Button";
import { doLogout } from "@/services/function/logout";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";


export default function Home() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        const result = await doLogout();
        setLoading(false);

        if (result.success) {
            router.replace("../welcome" as const);
        } else {
            console.log(result.message);
        }
    };

    return (
        <View className="mt-24">
            <Text>You have been logged in!</Text>
            <CE_Button
                title="Logout"
                onPress={handleLogout}
                isLoading={loading}
            />
        </View>
    );
}
