import { CE_Alert } from "@/components/Alert"
import { CE_Card } from "@/components/Card"
import { CE_Loading } from "@/components/Loading"
import { API_GetLanguage } from "@/services/api/other/api.language"
import { I_Lang } from "@/services/api/other/api.language.int"
import { I_Store } from "@/services/api/store/api.store.int"
import { I_User } from "@/services/api/user/api.user.get.int"
import { priceFormat } from "@/services/function/formatPrice"
import { doLogout } from "@/services/function/logout"
import { updateStoreData } from "@/services/function/updateStoreData"
import { updateUserData } from "@/services/function/updateUserData"
import { useLocale } from "@/services/function/useLocale"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { lazy, Suspense, useEffect, useState } from "react"
import { Dimensions, RefreshControl, ScrollView, Text, View } from "react-native"
import AboutPage from "../about/about.main"
import ContactSupport from "../cs/cs.main"
import { locales } from "../locales"
import PrivacyPolicy from "../policy/policy.main"
import ModalChangeLanguage from "./account.modal.language"
import { LogoutModal } from "./account.modal.logout"
import AccountSettingList from "./account.setting.list"

const ManageItem = lazy(() => import("../manage/item/manage.item.main"));
const ManageAdmin = lazy(() => import("../manage/admin/manage.admin.main"));
const ManageStore = lazy(() => import("../manage/store/store.main"));
const AccountDetails = lazy(() => import("../profile/profile.main"));
const AccountReport = lazy(() => import("../report/report.main"));

interface I_Props {
    lang: I_Lang
    userData: I_User
    storeData: I_Store
}

export default function AccountMain(props: I_Props) {
    const [lang, setLang] = useState(props.lang)
    const [userData, setUserData] = useState<I_User>(props.userData)
    const [storeData, setStoreData] = useState<I_Store>(props.storeData)
    const [balance, setBalance] = useState(props.storeData.balance)
    const navigation = useNavigation<any>();
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [manageOpen, setManageOpen] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const screenHeight = Dimensions.get("window").height

    const language = useLocale(lang, locales)

    const onRefresh = async () => {
        setRefreshing(true)
        await getNewUserData()
        await getNewStoreData()
        await getNewAdminData()
        setRefreshing(false)
    }

    const refreshLang = async () => {
        await getNewLang()
    }

    useEffect(() => {
        onRefresh()
    },[])

    const getNewLang = async () => {
        const result = await API_GetLanguage()
        if(result) setLang(result)
        else {
            setAlertMsg("Failed to change language. Please try again.")
            setAlertSuccess(false)
            setShowAlert(true)
        }
    }

    const getNewUserData = async () => {
        const result = await updateUserData()
        if(result !== null) {
            setUserData(result)
        } else {
            setAlertMsg("Failed to refresh user data. Please try again.")
            setAlertSuccess(false)
            setShowAlert(true)
        }
    }

    const getNewStoreData = async () => {
        const result = await updateStoreData()
        if(result !== null) {
            setBalance(result.balance)
        } else {
            setAlertMsg("Failed to refresh user data. Please try again.")
            setAlertSuccess(false)
            setShowAlert(true)
        }
    }

    const getNewAdminData = async () => {

    }

    const logout = async () => {
        const result = await doLogout();
        if (!result.success) {
            setAlertMsg("Failed to logout. Please try again in 5 minutes.")
            setShowAlert(true)
            setAlertSuccess(false)
        } else {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "(tabs)" }],
                })
            )
        }
    }

    const handleBack = async () => {
        setManageOpen('')
        getNewUserData()
    }

    return (
        <View className="min-h-screen mx-5" >
            {showAlert && (
                <View style={{ top: screenHeight * -0.1 }}>
                    <CE_Alert 
                        message={alertMsg} 
                        isSuccess={alertSuccess} 
                        showAlert={showAlert} 
                        onClose={() => setShowAlert(false)}         
                    />
                </View>
            )}

                {manageOpen === '' || manageOpen === 'lang' ? (
                    <View>
                        {manageOpen === 'lang' && (
                            <ModalChangeLanguage 
                                isModalOpen={manageOpen === 'lang'}
                                doRefresh={refreshLang}
                                setIsModalOpen={() => setManageOpen('')}
                                setUpAlert={(msg: string, isSuccess: boolean) => {
                                    setShowAlert(true)
                                    setAlertMsg(msg)
                                    setAlertSuccess(isSuccess)
                                }}
                                lang={lang}
                            />
                        )}
                        <View className="flex flex-row gap-2 items-center mb-4 mt-4">
                            <Text className="text-primary font-bold text-2xl">
                                {userData.name.length > 20
                                    ? userData.name.slice(0, 20) + '...'
                                    : userData.name}
                            </Text>
                            <Text>|</Text>
                            <Text className="text-secondary font-semibold text-lg">
                            {userData.id === storeData.owner_id ? language.role.owner : language.role.cashier}
                            </Text>
                        </View>
                        
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={["#16B8A8"]}       
                                    tintColor="#16B8A8"        
                                    title="Loading..."         
                                    titleColor="#16B8A8"        
                                />
                            }
                            showsVerticalScrollIndicator={false}
                        >
                            <Text className="text-secondary text-3xl font-bold mb-3">{storeData.name}</Text>
                            <CE_Card className="bg-primary p-5 flex justify-center mb-8">
                                <Text className="text-white font-semibold text-lg">{language.store.balance}</Text>
                                <Text className="text-white font-bold text-3xl">{priceFormat(balance, "IDR")}</Text>
                            </CE_Card>
                
                            <AccountSettingList 
                                lang={lang}
                                setManageOpen={(page) => setManageOpen(page)} 
                                doLogout={() => setIsModalOpen(true)}
                            />
                        </ScrollView>
                    </View>
                    ) : manageOpen === 'detail' ? (
                        <Suspense fallback={
                            <CE_Loading />
                        }>
                            <AccountDetails 
                                lang={lang}
                                userData={userData} 
                                handleBack={() => handleBack()}
                                setShowAlert={setShowAlert}
                                setAlertMsg={setAlertMsg}
                                setAlertSuccess={setAlertSuccess}
                            />
                        </Suspense>
                    ) : manageOpen === 'item' ? (
                        <Suspense fallback={<CE_Loading />}>
                            <ManageItem 
                                lang={lang}
                                handleBack={() => handleBack()}
                                storeData={storeData}
                                setShowAlert={setShowAlert}
                                setAlertMsg={setAlertMsg}
                                setAlertSuccess={setAlertSuccess}
                            />
                        </Suspense>
                    ) : manageOpen === 'admin' ? (
                        <Suspense fallback={<CE_Loading />}>
                            <ManageAdmin 
                                lang={lang}
                                storeId={props.storeData.id}
                                handleBack={() => handleBack()}
                                setUpAlert={(msg, isSuccess) => {
                                    setAlertMsg(msg)
                                    setAlertSuccess(isSuccess)
                                    setShowAlert(true)
                                }}
                            />
                        </Suspense>
                    ) : manageOpen === 'store' ? (
                        <Suspense fallback={<CE_Loading />}>
                            <ManageStore 
                                handleBack={() => handleBack()}
                                storeData={storeData}
                                balance={balance}
                                setShowAlert={setShowAlert}
                                setAlertMsg={setAlertMsg}
                                setAlertSuccess={setAlertSuccess}
                                setStoreData={setStoreData}
                            />
                        </Suspense>
                    ) : manageOpen === 'report' ? (
                        <Suspense fallback={<CE_Loading />}>
                            <AccountReport 
                                storeId={props.storeData.id}
                                lang={lang}
                                handleBack={() => handleBack()}
                                setupAlert={(msg, isSuccess) => {
                                    setAlertMsg(msg)
                                    setAlertSuccess(isSuccess)
                                    setShowAlert(true)
                                }}
                            />
                        </Suspense>
                    ) : manageOpen === 'privacypolicy' ? (
                        <Suspense fallback={<CE_Loading />}>
                            <PrivacyPolicy 
                                lang={lang}
                                handleBack={() => handleBack()}
                            />
                        </Suspense>
                    ) : manageOpen === 'cs' ? (
                        <Suspense fallback={<CE_Loading />}>
                            <ContactSupport 
                                lang={lang}
                                handleBack={() => handleBack()}
                            />
                        </Suspense>
                    ) : manageOpen === 'about' ? (
                        <Suspense fallback={<CE_Loading />}>
                            <AboutPage 
                                lang={lang}
                                handleBack={() => handleBack()}
                            />
                        </Suspense>
                    ) : <></>
                }

            <LogoutModal 
                language={language}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                logout={logout}
            />
        </View>
    )
}
