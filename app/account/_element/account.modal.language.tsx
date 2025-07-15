import { CE_Button } from "@/components/Button"
import { CE_Dropdown } from "@/components/Dropdown"
import { API_UpdateLanguage } from "@/services/api/other/api.language"
import { I_Lang } from "@/services/api/other/api.language.int"
import { useState } from "react"
import { Modal, View } from "react-native"

interface I_Props{
    isModalOpen: boolean
    setIsModalOpen:(open: boolean)=>void
    setUpAlert:(msg: string, isSuccess: boolean)=>void
    doRefresh:()=>void
    lang: I_Lang
}

export default function ModalChangeLanguage(props: I_Props){
    const languageOptions: { label: string; value: "ID" | "EN" }[] = [
        { label: "Indonesia", value: "ID" },
        { label: "English", value: "EN" }
    ]

    const [langInput, setLangInput] = useState<{ label: string; value: "ID" | "EN" }>(
        languageOptions.find((opt) => opt.value === props.lang.name)!
    )
    
    const doChangeLang = async () => {
        const result = await API_UpdateLanguage({ name: langInput.value })
        if(result) {
            props.setUpAlert("Update language success!", true)
            props.doRefresh()
            props.setIsModalOpen(false)
        } else {
            props.setUpAlert("Failed update language", false)
            props.doRefresh()
            props.setIsModalOpen(false)
        }
    }

    return (
        <Modal
            visible={props.isModalOpen}
            transparent
            animationType="fade"
            onRequestClose={() => props.setIsModalOpen(false)}
        >
            <View className="flex-1 bg-black/50 justify-center items-center px-6">
                <View className="bg-white p-5 rounded-xl w-full">
                    <View className="mt-3 space-y-4 mb-3">
                    <CE_Dropdown
                        label="Language"
                        selected={langInput.label}
                        options={languageOptions}
                        onSelect={(val) =>
                            setLangInput(languageOptions.find((opt) => opt.value === val)!)
                        }
                    />

                    </View>
                    <View className="flex flex-row justify-between gap-3">
                        <CE_Button 
                            title="Cancel" 
                            onPress={() => props.setIsModalOpen(false)} 
                            className="flex-1" 
                        />
                        <CE_Button
                            title="Save"
                            bgColor="bg-secondary"
                            onPress={() => {
                                doChangeLang()
                                props.setIsModalOpen(false)
                            }}
                            className="flex-1"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}