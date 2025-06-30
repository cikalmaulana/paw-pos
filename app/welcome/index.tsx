import { CE_Alert } from "@/components/Alert";
import { CE_Button } from "@/components/Button";
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";

export default function Welcome() {
    const router = useRouter()
    const goToLogin = () => { router.navigate("/login") }
    const goToRegister = () => { router.navigate("/register") };
    const { isSuccess, message } = useLocalSearchParams();
    const [showAlert, setShowAlert] = useState(!!message);

    const isSuccessBool = isSuccess === "true";

    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if (message) {
            const timeout = setTimeout(() => {
                router.setParams({});
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [message]);

    return (
        <>
            {showAlert && (
                <CE_Alert
                    message={typeof message === "string" ? message : ""}
                    isSuccess={isSuccessBool}
                    showAlert={showAlert}
                    onClose={() => setShowAlert(false)}
                />
            )}
            <LoginRegisterLayout title="Welcome Back!">
                <CE_Button title="Sign In" onPress={() => goToLogin()} className="mt-20 mb-4"/>
                <CE_Button title="Register" onPress={() => goToRegister()} bgColor="bg-secondary"/>
            </LoginRegisterLayout>
        </>
    )
}