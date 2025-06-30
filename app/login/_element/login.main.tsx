import { CE_Button } from "@/components/Button";
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { useState } from "react";
import { ForgotForm } from "./login.forgot.main";
import { LoginForm } from "./login.form";

export function LoginMain(){
    const [isForgotOpen, setForgotOpen] = useState(false)

    return (
        <>
            <LoginRegisterLayout title={!isForgotOpen ? "Sign In" : "Forgot Password"}>
                {!isForgotOpen ? (
                    <>
                        <LoginForm />
                        <CE_Button title="Forgot Password" onPress={() => setForgotOpen(true)} bgColor="bg-secondary"/>
                    </>
                ) : (
                    <ForgotForm setOpen={(isOpen) => setForgotOpen(isOpen)} />
                )}
            </LoginRegisterLayout>
        </>
    )
}