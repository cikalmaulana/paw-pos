import { CE_Button } from "@/components/Button"
import { Image, Modal, Text, View } from "react-native"

interface I_Props{
    isModalOpen: boolean
    setIsModalOpen:(open: boolean)=>void
    logout:()=>void
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
                    <Text className="text-lg font-semibold text-center mb-4">Are you sure you want to logout?</Text>
                    <View className="flex flex-row justify-between gap-3">
                        <CE_Button 
                            title="Cancel" 
                            onPress={() => props.setIsModalOpen(false)} 
                            className="flex-1" 
                        />
                        <CE_Button
                            title="Logout"
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