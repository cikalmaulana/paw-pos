import { CE_Alert } from "@/components/Alert";
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { useRouter } from "expo-router";
import { useState } from "react";
import { doRegister } from "../_function/do.register";
import { RegisterCaptcha } from "./register.captcha";
import { RegisterForm } from "./register.form";
import { RegisterOTP } from "./register.otp";

export function RegisterMain(){
    const router = useRouter()
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [step, setStep] = useState(1)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const nextStep = async (newStep: number) => {
        if (newStep === 4) {
            setIsLoading(true)
            setTimeout(async () => {
                const result = await doRegister({ name, password, phone: phoneNumber });
                if (result.meta.status === "success") {
                    router.replace({
                        pathname: "../welcome",
                        params: {
                        isSuccess: "true",
                        message: result.meta.message,
                        },
                    } as const);
                } else {
                    setAlertMsg(result.meta.message);
                    setShowAlert(true);
                }
                setIsLoading(false)
            }, 2000)
        } else {
            setStep(newStep);
        }
    };

    return (
        <>
            {showAlert && (
                <CE_Alert
                    message={alertMsg}
                    isSuccess={false}
                    showAlert={showAlert}
                    onClose={() => setShowAlert(false)}
                />
            )}
            <LoginRegisterLayout title="Register">
                {step === 1 && (
                    <RegisterForm 
                        name={name}
                        phoneNumber={phoneNumber}
                        password={password}
                        rePassword={rePassword}
                        setName={setName}
                        setPhoneNumber={setPhoneNumber}
                        setPassword={setPassword}
                        setRePassword={setRePassword}
                        submit={() => nextStep(2)}
                    />
                )}
                {step === 2 && (
                    <RegisterCaptcha 
                        setNext={(newStep) => nextStep(newStep)}
                    />
                )}
                {step === 3 && (
                    <RegisterOTP
                        setNext={(newStep) => nextStep(newStep)}
                        isLoading={isLoading}
                    />
                )}
            </LoginRegisterLayout>
        </>
    )
}