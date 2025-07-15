import { CE_Button } from "@/components/Button"
import { Image, Modal, Text, View } from "react-native"
import { locales } from "../locales"

interface I_Props{
    isModalOpen: boolean
    setIsModalOpen:(open: boolean)=>void
    logout:()=>void
    language: typeof locales["en"]
}

export function LogoutModal(props: I_Props){
    return (
        <Modal
            visible={props.isModalOpen}
            transparent
            animationType="fade"
            onRequestClose={() => props.setIsModalOpen(false)}
        >
            <View className="flex-1 bg-black/50 justify-center items-center px-6">
                <View className="bg-white p-5 rounded-xl w-full">
                    <View className="w-full flex items-center justify-center mb-3">
                        <Image 
                            source={require('@/assets/icons/warning.png')}
                            style={{width: 52, height: 52}}
                        />
                    </View>
                    <Text className="text-lg font-semibold text-center mb-4">{props.language.logout.title}</Text>
                    <View className="flex flex-row justify-between gap-3">
                        <CE_Button 
                            title={props.language.logout.buttonCancel}
                            onPress={() => props.setIsModalOpen(false)} 
                            className="flex-1" 
                        />
                        <CE_Button
                            title={props.language.logout.buttonLogout}
                            bgColor="bg-danger"
                            onPress={() => {
                                props.logout()
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