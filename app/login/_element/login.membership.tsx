import { CE_Alert } from "@/components/Alert"
import { CE_Button } from "@/components/Button"
import { CE_Card } from "@/components/Card"
import { Input } from "@/components/Input"
import { LoginRegisterLayout } from "@/components/LoginRegisterHeader"
import { OTPInput } from "@/components/OTP"
import { API_GetAllMembershipData, API_GetOwnerOtp } from "@/services/api/membership/api.membership"
import { I_MembershipData } from "@/services/api/membership/api.membership.int"
import { API_SetAsAdmin, API_SetNewStore } from "@/services/api/store/api.store.set"
import { I_User } from "@/services/api/user/api.user.get.int"
import { globalEmitter } from "@/services/function/globalEmitter"
import { useLang } from "@/services/function/LangContext"
import { router, useNavigation } from "expo-router"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { useState } from "react"
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native"
import ModalChangeLanguage from "./login.change.lang"

interface I_Props{
    user: I_User
}

const ALERT_NAME = 'alert-login-membership'

export default function LoginMembership(props: I_Props){
    const screenHeight = Dimensions.get("window").height
    const { lang, setLang } = useLang()
    const navigation = useNavigation();

    const [step, setStep] = useState('1')
    const [role, setRole] = useState<'owner' | 'cashier' | ''>('')
    const [title, setTItle] = useState('Choose Role')
    const [ownerPhone, setOwnerPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [otpCheckerWarning, setOtpCheckerWarning] = useState('')
    const [storePhone, setStorePhone] = useState('')
    const [storeAddress, setStoreAddress] = useState('')
    const [storeName, setStoreName] = useState('')
    const [modalLangOpen, setModalLangOpen] = useState(false)

    const [otpOwner, setOTPOwner] = useState("")
    const [membershipData, setMembershipData] = useState<I_MembershipData[]>([])
    const [reloadMembershipShow, setReloadMembershipShow] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0);

    const getMembershipData = async () => {
        const result = await API_GetAllMembershipData()
        console.log("getMembershipData result: ", result)
        if (result) {
            if (result.meta.status === 'success' && result.data) {
                setReloadMembershipShow(false)
                setMembershipData(result.data)
            } else {
                setupAlert("Failed to get membership data.", false)
                setReloadMembershipShow(true)
            }
        } else {
            setupAlert("Failed to get membership data.", false)
            setReloadMembershipShow(true)
        }
    }

    const setMembership = (id: string) => {

    }

    const setNewStep = async (newStep: string) => {
        setStep(newStep)
        if (newStep === '1') {
            setRole('')
            setTItle('Choose Role')
        } else if (newStep === '2') {
            setTItle(`${role === 'cashier' ? "Setup Cashier Account" : "Setup Store"}`)
        } else if (newStep === '3') {
            if (role === 'cashier') {
                setupAlert("Congratulation! Your Cashier account is Active!", true)
                router.replace("/(tabs)")
            } else {
                setTItle("Membership")
                getMembershipData()
            }
        } else if (newStep === "4"){
            const payload = {
                    user_id: props.user.id,
                    name: storeName,
                    address: storeAddress,
                    phone: storePhone
                }
                const result = await API_SetNewStore(payload)
                if (result) {
                    if (result.meta.status === 'success') {
                        // kalo sukses, langsung get membership detail, jgn langsung kirim ke home!
                        navigation.dispatch(
                            router.replace("/(tabs)")
                        )
                    } else setupAlert(result.meta.message, false)
                } else setupAlert("Failed to update store. Please try again in 5 minutes.", false)
        }
    }

    const otpChecker =  async () => {
        setIsLoading(true)
        const result = await API_GetOwnerOtp(ownerPhone)
        
        if (result) {
            console.log("RESULT: ", result)
            if (new Date(result.data.expired) <= new Date()) {
                setupAlert("OTP is expired. Ask Owner to generate OTP Again", false)
                setIsLoading(false)
                return
            } 
            
            if (result.data.otp === otpOwner) {
                const payload = {
                    store_id: result.data.store_id,
                    user_id: props.user.id
                }
                const setAsAdminRes = await API_SetAsAdmin(payload)
                if(setAsAdminRes){
                    if (setAsAdminRes.meta.status === 'success') setNewStep("3")
                    else setupAlert("Failed to sign as Cashier. Please try again in 5 minutes", false)
                } else {
                    setupAlert("Failed to sign as Cashier. Please try again in 5 minutes", false)
                }
            }
            else setOtpCheckerWarning("Wrong OTP")
            setIsLoading(false)
        }
    }

    const setupAlert = (msg: string, isSuccess: boolean) => {
        globalEmitter.emit(ALERT_NAME, {
            message: msg,
            isSuccess: isSuccess,
        });
    }

    const { width } = Dimensions.get("window")

    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    top: screenHeight * -0.1,
                    left: 0,
                    right: 0,
                    zIndex: 999,
                }}
            >
                <CE_Alert name={ALERT_NAME} />
            </View>

            <LoginRegisterLayout 
                title={title} 
                modalOpen={modalLangOpen}
                openModalChangeLang={(open) => setModalLangOpen(open)}
            >

                {step === "1" && ( // set first role
                    <View className="flex flex-col items-center justify-center w-full min-h-screen -mt-48" >
                        <View className="flex flex-row w-full items-center justify-center mb-4">
                            <Text className="font-semibold text-lg">Selected Role: </Text>
                            <Text className="font-bold text-lg text-secondary">{role.toUpperCase()}</Text>
                        </View>
                        
                        <CE_Button
                            title="Owner"
                            onPress={() => setRole("owner")}
                            className="w-full"
                        />
                        <View className="flex-row items-start bg-gray-100 p-3 rounded-lg mt-2 w-full">
                            <Text className="text-lg mr-2">👑</Text>
                            <Text className="flex-1 text-gray-600 text-sm">
                                <Text className="font-semibold">Owner</Text> memiliki <Text className="font-semibold">akses penuh</Text> untuk mengatur
                                semua data toko, termasuk manajemen produk, transaksi, dan pengaturan
                                pengguna.
                            </Text>
                        </View>

                        <CE_Button
                            title="Cashier"
                            onPress={() => setRole("cashier")}
                            className="w-full mt-4"
                            bgColor="bg-secondary"
                        />
                        <View className="flex-row items-start bg-gray-100 p-3 rounded-lg mt-2 w-full">
                            <Text className="text-lg mr-2">💵</Text>
                            <Text className="flex-1 text-gray-600 text-sm">
                                <Text className="font-semibold">Kasir</Text> bertugas melayani <Text className="font-semibold">transaksi harian</Text>{" "}
                                pelanggan, tanpa akses ke pengaturan atau data sensitif toko.
                            </Text>
                        </View>

                        <CE_Button
                            title="Next"
                            onPress={() => setNewStep("2")}
                            className="w-full mt-8"
                            disabled={role === ""}
                        />
                        {role !== '' && (
                            <View className="flex w-full justify-center items-center mt-2">
                                <Text className="text-danger font-semibold">Pastikan Role sudah sesuai</Text>
                            </View>
                        )}
                    </View>

                )}

                {(step === "2" && role === 'cashier') && ( // set otp from owner, when done go to home
                    <ScrollView contentContainerClassName="flex flex-col items-center justify-center w-full">
                        {/* <Input label={"Owner Phone Number"} type="number" onChangeText={setOwnerPhone} className="mb-2"/> */}
                        <Input
                            label="Owner Phone Number"
                            type="number"
                            value={ownerPhone}
                            onChangeText={setOwnerPhone}
                        />
                        <Text className="mt-4 mb-4 text-primary font-bold">OTP Code Owner</Text>
                        {otpCheckerWarning !== '' && (<Text className="bg-danger font-semibold mb-2">{otpCheckerWarning}</Text>)}
                        <OTPInput setOtp={(otp) => setOTPOwner(otp)} isLoading={isLoading}/>
                        <CE_Button title="Next" onPress={() => otpChecker()} className="mt-4"/>
                    </ScrollView>
                )}

                {(step === "2" && role === 'owner') && ( // set store details, when done go to step 3
                    <View className="flex flex-col items-center justify-center w-full min-h-screen -mt-48" >
                        <View className="flex flex-col gap-2 mb-3">
                            <Input
                                label="Store Name"
                                placeholder="store name"
                                value={storeName}
                                onChangeText={setStoreName}
                            />
                            {/* {phoneNumebrWarning && (<Text className="text-danger">{phoneNumebrWarning}</Text>)} */}
                            <Input
                                label="Store Address"
                                placeholder="store address"
                                value={storeAddress}
                                onChangeText={setStoreAddress}
                            />

                            <Input
                                label="Store Phone Number"
                                keyboardType="numeric"
                                placeholder="store phone number"
                                value={storePhone}
                                onChangeText={setStorePhone}
                            />
                        </View>

                        <View className="flex flex-row justify-between gap-4 mt-8">
                            <CE_Button
                                title="Back"
                                onPress={() => setNewStep("1")}
                                bgColor="bg-secondary"
                                className=" flex-1 w-full"
                            />

                            <CE_Button
                                title="Next"
                                onPress={() => setNewStep("3")}
                                className="flex-1 w-full"
                                disabled={storeName === ''}
                            />
                        </View>
                    </View>
                )}

                {(step === "3" && role === 'owner') && ( // popup / page shows banner "Free Trial for New User 14 Days with All Feature Unlock!". in here, setp member_type to 'trial'
                    <ScrollView contentContainerClassName="flex flex-col items-center justify-center w-full h-auto">
                        {reloadMembershipShow ? (
                            <CE_Button
                                title="Reload Page"
                                onPress={() => setNewStep("3")}
                                className="flex-1 w-full"
                                disabled={storeName === ''}
                            />
                        ) : (
                            <>
                                <Text className="text-primary text-xl font-bold mb-2">Choose Membership Options</Text>
                                <View className="h-1 bg-primary w-full mb-2" />

                                <FlatList
                                    data={membershipData}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    snapToAlignment="center"
                                    decelerationRate="fast"
                                    snapToInterval={width}
                                    onScroll={(e) => {
                                        const index = Math.round(e.nativeEvent.contentOffset.x / width)
                                        setActiveIndex(index)
                                    }}
                                    renderItem={({ item }) => (
                                        <View style={{ width, alignItems: "center" }}>
                                            <CE_Card
                                                id={item.id}
                                                className="bg-white p-5 w-3/4 flex mb-8 mt-4 min-h-[400px]"
                                            >
                                                <View className="flex flex-1 flex-col">
                                                    <View className="mb-4 flex justify-center items-center">
                                                        <Text className="text-primary font-bold text-2xl mb-1">
                                                            {item.name}
                                                        </Text>
                                                        <Text className="text-secondary font-bold text-sm mb-2">
                                                            Duration: {item.duration_in_days} days
                                                        </Text>
                                                        <View className="h-1 bg-primary w-full" />
                                                    </View>

                                                    <View className="flex-1 items-center justify-center">
                                                        {item.benefit.map((benefit, idx) => (
                                                            <Text
                                                                key={idx}
                                                                className="font-semibold text-lg text-description"
                                                            >
                                                                {idx + 1}. {benefit}
                                                            </Text>
                                                        ))}
                                                    </View>

                                                    <View className="mt-4">
                                                        <CE_Button
                                                            title="Choose"
                                                            onPress={() => setMembership(item.id)}
                                                            className="w-full"
                                                        />
                                                    </View>
                                                </View>
                                            </CE_Card>
                                        </View>
                                    )}
                                />
                                    
                                {activeIndex > 0 && (
                                    <View
                                        style={{
                                            position: "absolute",
                                            left: 10,
                                            top: "50%",
                                            transform: [{ translateY: -15 }],
                                        }}
                                    >
                                        <ChevronLeft size={30} color="#666" />
                                    </View>
                                )}

                                {activeIndex < membershipData.length - 1 && (
                                    <View
                                        style={{
                                            position: "absolute",
                                            right: 10,
                                            top: "50%",
                                            transform: [{ translateY: -15 }],
                                        }}
                                    >
                                        <ChevronRight size={30} color="#666" />
                                    </View>
                                )}

                                <View className="flex flex-row justify-center mt-2">
                                    {membershipData.map((_, idx) => (
                                    <View
                                        key={idx}
                                        className={`h-2 w-2 mx-1 rounded-full ${
                                            idx === activeIndex ? "bg-primary" : "bg-gray-400"
                                        }`}
                                    />
                                    ))}
                                </View>
                            </>
                        )}
                    </ScrollView>
                )}
            </LoginRegisterLayout>

            {modalLangOpen && (
                <ModalChangeLanguage 
                    isOpen={modalLangOpen}
                    setIsModalOpen={(open) => setModalLangOpen(open)}
                    setUpAlert={(msg: string, isSuccess: boolean) => {
                        setupAlert(msg, isSuccess)
                    }}
                    langNow={lang.name}
                    changeLang={(newLang) => setLang({ name: newLang })}
                />
            )}
        </>
    )
}