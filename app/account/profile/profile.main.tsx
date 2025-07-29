import { CE_BackButton } from "@/components/BackButton";
import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { I_Lang } from "@/services/api/other/api.language.int";
import { API_ChangePassword, API_EditUser } from "@/services/api/user/api.user.get";
import { I_ChangePasswordRequest, I_EditUserRequest, I_User } from "@/services/api/user/api.user.get.int";
import { useEffect, useMemo, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { locales } from "./locales";

interface I_Props{
    lang: I_Lang
    userData: I_User
    handleBack:()=>void
    setupAlert:(msg: string, isSuccess: boolean)=>void
}

export default function AccountDetails(props: I_Props){
    const [name, setName] = useState(props.userData.name)
    const [phone, setPhone] = useState(props.userData.phone)
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [newRePass, setNewRePass] = useState("")
    const [oldPassWarn, setOldPassWarn] = useState("")
    const [newPassWarn, setNewPassWarn] = useState("")
    const [newRePassWarn, setNewRePassWarn] = useState('')
    const [firstLoad, setFirstLoad] = useState(true)

    const language = useMemo(() => getLocale(props.lang), [props.lang])
    
    function getLocale(lang: I_Lang): typeof locales["en"] {
        return locales[lang.name.toLowerCase() as "en" | "id"]
    }

    const saveNewProfile = async () => {
        const payload: I_EditUserRequest = {
            id: props.userData.id,
            name: name,
            phone: phone
        }

        const result = await API_EditUser(payload)
        if(result) {
            if(result.meta.status !== 'success'){
                props.setupAlert(result.meta.message, false)
            } else {
                props.setupAlert("Update profile success!", true)
            }
        } else {
            props.setupAlert("Failed to update profile. Try again in 5 minutes.", false)
        }
        
        props.handleBack()
    }

    useEffect(() => {
        if(firstLoad) {
            setFirstLoad(false)
            return
        }

        if (newPass.trim() !== newRePass.trim()) {
            setNewRePassWarn("Password did not match!")
        } else setNewRePassWarn("")

        if (oldPass !== "") setOldPassWarn("")
        if (newPass !== "") setNewPassWarn("")
    },[newRePass, newPass, oldPass])

    const handleCancelChangePass = () => {
        setChangePasswordOpen(false)
        setOldPass("")
        setNewPass("")
        setNewRePass("")
    }

    const handleChangePass = async () => {
        if (oldPass === '') {
            setOldPassWarn("Fill old password!")
            return
        } else if (newPass === '') {
            setNewPassWarn("Fill new password")
            return 
        } else if (newRePass === '') {
            setNewRePassWarn("Please confirm new password")
            return
        }

        if (newPass.trim() !== newRePass.trim()) {
            setNewRePassWarn("Password did not match!")
        }

        const payload: I_ChangePasswordRequest = {
            id: props.userData.id,
            oldPass: oldPass,
            newPass: newPass
        }

        const result = await API_ChangePassword(payload)
        if(result) {
            if(result.meta.status !== 'success') {
                props.setupAlert(result.meta.message, false)
            } else {
                props.setupAlert("Change password success", true)
            }
        } else {
            props.setupAlert("Failed to change password. Please try again in 5 minutes.", false)
        }

        setChangePasswordOpen(false)

        setOldPass("")
        setNewPass("")
        setNewRePass("")
    }
    
    return (
        <View>
            <CE_BackButton lable={language.title} onPress={props.handleBack}/>
            <ScrollView className="min-h-screen">
                <View className="flex flex-col justify-between gap-4">
                    <Input label={language.editProfileform.name} onChangeText={setName} value={name}/>
                    <Input label={language.editProfileform.phone} onChangeText={setPhone} value={phone}/>
                    <CE_Button title={language.button.save} onPress={() => saveNewProfile()}/>
                    <CE_Button title={language.button.changePassword} onPress={() => setChangePasswordOpen(true)} bgColor="bg-secondary"/>
                </View>
            </ScrollView>

            <Modal
                visible={changePasswordOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setChangePasswordOpen(false)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        className="flex-1"
                    >
                        <View className="flex-1 bg-black/50 justify-center items-center px-6">
                            <View className="bg-white p-5 gap-3 rounded-xl w-full max-h-[80%]">
                                <ScrollView keyboardShouldPersistTaps="handled">
                                    <View className="flex flex-col gap-3">
                                        <Input label={language.changePasswordForm.old} onChangeText={setOldPass} value={oldPass} type="password"/>
                                        {oldPassWarn !== '' && (<Text className="text-danger text-sm">{oldPassWarn}</Text>)}
                                        <Input label={language.changePasswordForm.new} onChangeText={setNewPass} value={newPass} type="password" />
                                        {newPassWarn !== '' && (<Text className="text-danger text-sm">{newPassWarn}</Text>)}
                                        <Input label={language.changePasswordForm.confirm} onChangeText={setNewRePass} value={newRePass} type="password" />
                                        {newRePassWarn !== '' && (<Text className="text-danger text-sm">{newRePassWarn}</Text>)}
                                    </View>

                                    <View className="flex flex-row justify-between gap-3 mt-5">
                                        <CE_Button
                                            title={language.changePasswordForm.button.cancel}
                                            onPress={() => handleCancelChangePass()}
                                            className="flex-1"
                                            bgColor="bg-primary"
                                        />
                                        <CE_Button
                                            title={language.changePasswordForm.button.change}
                                            bgColor="bg-secondary"
                                            onPress={handleChangePass}
                                            className="flex-1"
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}