import { CE_Button } from "@/components/Button";
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader";
import { I_User } from "@/services/api/user/api.user.get.int";
import { useState } from "react";
import { ForgotForm } from "./login.forgot.main";
import { LoginForm } from "./login.form";
import LoginMembership from "./login.membership";
import LoginMembershipExpired from "./login.membership.expired";

export function LoginMain(){
    const [isForgotOpen, setForgotOpen] = useState(false)
    const [isMembershipOpen, setIsMembershipOpen] = useState(false)
    const [isMemberExpired, setIsMemberExpired] = useState(false)
    const [userData, setUserData] = useState<I_User | null>(null)

    return (
        <>
            {(isMemberExpired && userData) ? (
                <LoginMembershipExpired user={userData}/>
            ) : (isMembershipOpen && userData) ? (
                <LoginMembership user={userData}/>
            ) : (
                <LoginRegisterLayout title={!isForgotOpen ? "Sign In" : "Forgot Password"}>
                    {!isForgotOpen ? (
                        <>
                            <LoginForm 
                                setIsMembershipOpen={setIsMembershipOpen} 
                                setUserData={setUserData} 
                                setMemberExpired={setIsMemberExpired}
                            />
                            <CE_Button 
                                title="Forgot Password" 
                                onPress={() => setForgotOpen(true)} bgColor="bg-secondary"
                                className="mt-3"
                            />
                        </>
                    ) : (
                        <ForgotForm setOpen={(isOpen) => setForgotOpen(isOpen)} />
                    )}
                </LoginRegisterLayout>
            )}
        </>
    )
}