import { MODAL_NAME } from "@/app/constant/constant"
import { CE_Alert } from "@/components/Alert"
import { CE_Card } from "@/components/Card"
import { CE_Loading } from "@/components/Loading"
import { I_Lang } from "@/services/api/other/api.language.int"
import { I_Store } from "@/services/api/store/api.store.int"
import { I_User } from "@/services/api/user/api.user.get.int"
import { priceFormat } from "@/services/function/formatPrice"
import { globalEmitter } from "@/services/function/globalEmitter"
import { useLang } from "@/services/function/LangContext"
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

const ALERT_NAME = 'alert-account'

export default function AccountMain(props: I_Props) {
    const [userData, setUserData] = useState<I_User>(props.userData)
    const [storeData, setStoreData] = useState<I_Store>(props.storeData)
    const [balance, setBalance] = useState(props.storeData.balance)
    const navigation = useNavigation<any>();
    const [manageOpen, setManageOpen] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    const screenHeight = Dimensions.get("window").height

    const { lang, setLang } = useLang()
    const language = useLocale(lang, locales)

    const showLogoutModal = (
        logoutFn: (close: () => void, setLoading: (val: boolean) => void) => void,
        language: typeof locales["en"]
    ) => {
        globalEmitter.emit(MODAL_NAME, {
            id: "moda:logout",
            title: language.logout.title,
            description: language.logout.description,
            confirmText: language.logout.buttonLogout,
            cancelText: language.logout.buttonCancel,
            danger: true,
            onConfirm: logoutFn,
        })
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getNewUserData()
        await getNewStoreData()
        await getNewAdminData()
        setRefreshing(false)
    }

    useEffect(() => {
        onRefresh()
    },[])

    const getNewUserData = async () => {
        const result = await updateUserData()
        if(result !== null) {
            setUserData(result)
        } else {
            setupAlert("Failed to refresh user data. Please try again.", false)
        }
    }

    const setupAlert = (msg: string, isSuccess: boolean) => {
        globalEmitter.emit(ALERT_NAME, {
            message: msg,
            isSuccess: isSuccess,
        });
    }

    const getNewStoreData = async () => {
        const result = await updateStoreData()
        if(result !== null) {
            setBalance(result.balance)
        } else {
            setupAlert("Failed to refresh user data. Please try again.", false)
        }
    }

    const getNewAdminData = async () => {

    }

    const logout = async (close: () => void) => {
        const result = await doLogout()

        if (!result.success) {
            setupAlert("Failed to logout. Please try again in 5 minutes.", false)
        } else {
            close()
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

            {manageOpen === '' || manageOpen === 'lang' ? (
                <View>
                    {manageOpen === 'lang' && (
                        <ModalChangeLanguage 
                            isModalOpen={manageOpen === 'lang'}
                            setIsModalOpen={() => setManageOpen('')}
                            setUpAlert={(msg: string, isSuccess: boolean) => {
                                setupAlert(msg, isSuccess)
                            }}
                        />
                    )}
                    <View className="flex flex-row gap-2 items-center mb-4">
                        <View className="flex flex-row justify-between items-center">
                            <View className="flex flex-row gap-2 items-center">
                                <Text className="text-primary font-bold text-2xl">
                                    {language.title}
                                </Text>
                            </View>
                        </View>
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
                            doLogout={() => showLogoutModal(logout, language)}
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
                            setupAlert={(msg, isSuccess) => setupAlert(msg, isSuccess)}
                        />
                    </Suspense>
                ) : manageOpen === 'item' ? (
                    <Suspense fallback={<CE_Loading />}>
                        <ManageItem 
                            lang={lang}
                            handleBack={() => handleBack()}
                            storeData={storeData}
                            setupAlert={(msg, isSuccess) => setupAlert(msg, isSuccess)}
                        />
                    </Suspense>
                ) : manageOpen === 'admin' ? (
                    <Suspense fallback={<CE_Loading />}>
                        <ManageAdmin 
                            lang={lang}
                            storeId={props.storeData.id}
                            handleBack={() => handleBack()}
                            setUpAlert={(msg, isSuccess) => {
                                setupAlert(msg, isSuccess)
                            }}
                        />
                    </Suspense>
                ) : manageOpen === 'store' ? (
                    <Suspense fallback={<CE_Loading />}>
                        <ManageStore 
                            lang={lang}
                            handleBack={() => handleBack()}
                            storeData={storeData}
                            balance={balance}
                            setupAlert={(msg, isSuccess) => setupAlert(msg, isSuccess)}
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
                                setupAlert(msg, isSuccess)
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
        </View>
    )
}
