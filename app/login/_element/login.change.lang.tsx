import { CE_Button } from "@/components/Button"
import { CE_Dropdown } from "@/components/Dropdown"
import { useState } from "react"
import { Modal, View } from "react-native"

interface I_Props{
    isOpen: boolean
    setIsModalOpen: (open: boolean) => void
    setUpAlert:(msg: string, isSuccess: boolean)=>void
    langNow: string
    changeLang: (langNow: "ID" | "EN") => void
}

export default function ModalChangeLanguage(props: I_Props){
    if(!props.isOpen) return
    const languageOptions: { label: string; value: "ID" | "EN" }[] = [
        { label: "English", value: "EN" },
        { label: "Indonesia", value: "ID" },
    ]

    const [langInput, setLangInput] = useState<{ label: string; value: "ID" | "EN" }>(
        languageOptions.find((opt) => opt.value === props.langNow)!
    )
    
    const doChangeLang = async () => {
        props.changeLang(langInput.value)
    }

    return (
        <Modal
            visible={props.isOpen}
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