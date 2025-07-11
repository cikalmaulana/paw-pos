import { CE_Button } from "@/components/Button";
import { I_Menu } from "@/services/api/item/api.item.get.int";
import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";

interface I_Props{
    modalOpen: boolean
    selectedItem: I_Menu
    doDelete:(id: string)=>void
    setOpenModal: React.Dispatch<React.SetStateAction<{
        editItem: boolean,
        deleteItem: boolean
    }>>
}

export default function ItemDelete(props: I_Props) {
    return (
        <Modal
            visible={props.modalOpen}
            transparent
            animationType="fade"
            onRequestClose={() => props.setOpenModal(prev => ({ ...prev, deleteItem: false }))}
        >
            <Pressable 
                onPress={() => props.setOpenModal(prev => ({ ...prev, deleteItem: false }))}
                className="flex-1 bg-black/50 justify-center items-center px-6"
            >
                <Pressable 
                    onPress={(e) => e.stopPropagation()} 
                    className="bg-white p-6 rounded-2xl w-full max-w-md"
                >
                    <View className="items-center justify-center mb-4">
                        <Image 
                            source={require('@/assets/icons/warning.png')}
                            style={{ width: 52, height: 52 }}
                        />
                    </View>
        
                    <Text className="text-xl font-bold text-center text-primary mb-2">
                        {props.selectedItem.name}
                    </Text>
        
                    <Text className="text-base text-center font-medium text-black mb-6">
                        Are you sure you want to delete this item?
                    </Text>
        
                    <View className="flex-row gap-3">
                        <CE_Button
                            title="Delete"
                            bgColor="bg-danger"
                            onPress={() => props.doDelete(props.selectedItem.id)}
                            className="flex-1 py-2"
                            btnClassName="text-sm"
                        />
                        <CE_Button 
                            title="Cancel" 
                            onPress={() => props.setOpenModal(prev => ({ ...prev, deleteItem: false }))} 
                            className="flex-1 py-2"
                            btnClassName="text-sm"
                        />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}