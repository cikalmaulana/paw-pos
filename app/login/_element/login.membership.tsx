import { CE_Alert } from "@/components/Alert"
import { CE_Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader"
import { OTPInput } from "@/components/OTP"
import { API_GetOwnerOtp } from "@/services/api/membership/api.membership"
import { API_SetAsAdmin, API_SetStoreDetail } from "@/services/api/store/api.store.set"
import { I_User } from "@/services/api/user/api.user.get.int"
import { CommonActions } from "@react-navigation/native"
import { useNavigation } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

interface I_Props{
    user: I_User
}

export default function LoginMembership(props: I_Props){
    const navigation = useNavigation();

    const [step, setStep] = useState('1')
    const [role, setRole] = useState<'owner' | 'admin' | ''>('')
    const [title, setTItle] = useState('Choose Role')
    const [ownerPhone, setOwnerPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [otpCheckerWarning, setOtpCheckerWarning] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [storePhone, setStorePhone] = useState('')
    const [storeAddress, setStoreAddress] = useState('')
    const [storeName, setStoreName] = useState('')

    const setNewStep = async (newStep: string) => {
        setStep(newStep)
        if (newStep === '1') {
            setRole('')
            setTItle('Choose Role')
        } else if (newStep === '2') {
            setTItle(`${role === 'admin' ? "Setup Admin" : "Setup Store"}`)
        } else if (newStep === '3') {
            if (role === 'admin') {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "(tabs)" }],
                    })
                )
            } else if (role === 'owner') {
                const payload = {
                    name: storeName,
                    address: storeAddress,
                    phone: storePhone
                }
                const result = await API_SetStoreDetail(payload)
                if (result) {
                    if (result.meta.status === 'success') {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "(tabs)" }],
                            })
                        )
                    } else setAlertMsg(result.meta.message)
                } else setAlertMsg("Failed to update store. Please try again in 5 minutes.")
            }
        }
    }

    const otpChecker =  async (otpInput: string) => {
        setIsLoading(true)
        const result = await API_GetOwnerOtp(ownerPhone)
        
        if (result) {
            if (new Date(result.data.expired) > new Date()) {
                setAlertMsg("OTP is expired. Ask Owner to generate OTP Again")
                setShowAlert(true)
                return
            } 
            
            if (result.data.otp === otpInput) {
                const payload = {
                    store_id: result.data.store_id,
                    user_id: props.user.id
                }
                const setAsAdminRes = await API_SetAsAdmin(payload)
                if(setAsAdminRes){
                    if (setAsAdminRes.meta.status === 'success') setStep("3")
                    else setAlertMsg("Failed to sign as Admin. Please try again in 5 minutes")
                    setShowAlert(true)
                } else {
                    setAlertMsg("Failed to sign as Admin. Please try again in 5 minutes.")
                    setShowAlert(true)
                }
            }
            else setOtpCheckerWarning("Wrong OTP")
        }
    }

    return (
        <>
            { showAlert && (
                    <CE_Alert 
                        showAlert={showAlert}
                        message={alertMsg}
                        isSuccess={false}
                        onClose={() => {
                            setShowAlert(false)
                            setAlertMsg('')
                        }}
                    />
                )
            }

            <LoginRegisterLayout title={title}>

                {step === "1" && ( // set first role
                    <ScrollView className="flex flex-col items-center justify-center w-full min-h-screen">
                        <CE_Button title="Owner" onPress={() => setRole('owner')} />
                        <Text className="flex w-full items-center justify-center text-gray-700 mb-2">Owner is Store Owner wkwk</Text>
                        <CE_Button title="Owner" onPress={() => setRole('admin')} />
                        <Text className="flex w-full items-center justify-center text-gray-700">Admin is Store Admin like Cashier or something wkwk</Text>
                        <CE_Button title="Next" onPress={() => setNewStep("2")} />
                    </ScrollView>
                )}

                {(step === "2" && role === 'admin') && ( // set otp from owner, when done go to home
                    <ScrollView className="flex flex-col items-center justify-center w-full min-h-screen">
                        <Input label={"Owner Phone Number"} onChangeText={setOwnerPhone} className="mb-2"/>
                        {otpCheckerWarning !== '' && (<Text className="bg-danger font-semibold mb-2">{otpCheckerWarning}</Text>)}
                        <OTPInput setOtp={(otp) => otpChecker(otp)} isLoading={isLoading}/>
                        <CE_Button title="Next" onPress={() => setNewStep("3")} />
                    </ScrollView>
                )}

                {(step === "2" && role === 'owner') && ( // set store details, when done go to step 3
                    <ScrollView className="flex flex-col items-center justify-center w-full min-h-screen">
                        <Input label={"Name"} onChangeText={setStoreName} className="mb-2"/>
                        <Input label={"Address"} onChangeText={setStoreAddress} className="mb-2"/>
                        <Input label={"Phone"} onChangeText={setStorePhone} className="mb-2" optional={true}/>
                        <CE_Button title="Next" onPress={() => setNewStep("3")} />
                    </ScrollView>
                )}

                {(step === "3" && role === 'owner') && ( // popup / page shows banner "Free Trial for New User 14 Days with All Feature Unlock!". in here, setp member_type to 'trial'
                    <View>
                        
                    </View>
                )}


            </LoginRegisterLayout>
        </>
    )
}