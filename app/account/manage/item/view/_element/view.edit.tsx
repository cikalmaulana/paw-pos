import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { I_Menu } from "@/services/api/api.item.get.int";
import React from "react";
import { Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { EditData, EditDataWarn } from "../view.main";

interface I_Props{
    modalOpen: boolean
    selectedItem: I_Menu
    editData: EditData
    editDataWarn: EditDataWarn
    closeModal:()=>void
    doEditItem:(id: string)=>void
    pickImage:()=>void
    setEditData: React.Dispatch<React.SetStateAction<EditData>>
}

export default function ItemEdit(props: I_Props) {
    const { width, height } = Dimensions.get("window")
    return (
        <Modal
            visible={props.modalOpen}
            transparent
            animationType="fade"
            onRequestClose={props.closeModal}
        >
            <Pressable onPress={props.closeModal} className="flex-1 bg-black/50 justify-center items-center px-6">
                <Pressable
                    onPress={(e) => e.stopPropagation()}
                    style={{ maxHeight: height * 0.8, width: width * 0.9 }}
                    className="bg-white rounded-2xl p-4 w-full"
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={100}
                    >
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 16 }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <Text className="text-xl text-primary font-bold mb-4">Edit Item</Text>

                            <Text className="text-primary text-lg font-semibold mb-2">Image</Text>
                            <View className="relative w-full h-56 mb-4">
                                <Image
                                    source={typeof props.editData.currentItemImg === 'string' ? { uri: props.editData.currentItemImg } : props.editData.currentItemImg}
                                    className="w-full h-full rounded-xl"
                                    resizeMode="cover"
                                />
                                <Pressable
                                    onPress={props.pickImage}
                                    className="absolute inset-0 items-center justify-center"
                                >
                                    <Text className="text-secondary border border-secondary px-3 py-1 rounded-full bg-white/60 text-lg">
                                        Change Image
                                    </Text>
                                </Pressable>
                            </View>
                            {props.editDataWarn.currentItemImgWarn !== '' && (
                                <Text className="text-danger text-sm font-semibold -mt-3">{props.editDataWarn.currentItemImgWarn}</Text>
                            )}

                            <View className="flex flex-col gap-4 mb-4">
                                <Input
                                    label="Name"
                                    placeholder="Item Name"
                                    value={props.editData.currentItemName}
                                    onChangeText={(text) => props.setEditData(prev => ({
                                        ...prev,
                                        currentItemName: text
                                    }))}
                                />
                                {props.editDataWarn.currentItemNameWarn !== '' && (
                                    <Text className="text-danger text-sm font-semibold -mt-3">{props.editDataWarn.currentItemNameWarn}</Text>
                                )}

                                <Input
                                    label="Price"
                                    placeholder="Price"
                                    keyboardType="numeric"
                                    value={props.editData.currentItemPrice}
                                    onChangeText={(text) => props.setEditData(prev => ({
                                        ...prev,
                                        currentItemPrice: text
                                    }))}
                                />
                                {props.editDataWarn.currentItemPriceWarn !== '' && (
                                    <Text className="text-danger text-sm font-semibold -mt-3">{props.editDataWarn.currentItemPriceWarn}</Text>
                                )}

                                <Input
                                    label="Description"
                                    placeholder="Description"
                                    multiline
                                    numberOfLines={3}
                                    value={props.editData.currentItemDesc}
                                    onChangeText={(text) => props.setEditData(prev => ({
                                        ...prev,
                                        currentItemDesc: text
                                    }))}
                                />
                            </View>
                            <View className="flex-row gap-3 mt-4">
                                <CE_Button
                                    title="Cancel"
                                    bgColor="bg-primary"
                                    onPress={props.closeModal}
                                    className="flex-1 py-2"
                                    btnClassName="text-sm"
                                />
                                <CE_Button
                                    title="Save"
                                    onPress={() => props.doEditItem(props.selectedItem.id)}
                                    className="flex-1 py-2"
                                    btnClassName="text-sm"
                                    bgColor="bg-secondary"
                                />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </Pressable>
            </Pressable>
        </Modal>
    )
}