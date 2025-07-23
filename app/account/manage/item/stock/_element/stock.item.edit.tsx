import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Dimensions, Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { locales } from "../../locales";

interface I_Props{
    language: typeof locales["id"]
    id: string
    editItemModalOpen: boolean
    currentItemImg: string | number
    currentItemName: string
    currentStock: string
    stockWarn: string
    cancelEdit:()=>void
    saveEditStock:(id: string)=>void
    setEditStockState: React.Dispatch<React.SetStateAction<{
        editItemModalOpen: boolean
        currentItemImg: string | number
        currentItemName: string
        currentStock: string
        stockWarn: string
    }>>
}

export default function StockEdit(props: I_Props){
    const { width, height } = Dimensions.get("window");
    
    return (
        <Modal
            visible={props.editItemModalOpen}
            transparent
            animationType="fade"
            onRequestClose={props.cancelEdit}
        >
            <Pressable onPress={props.cancelEdit} className="flex-1 bg-black/50 justify-center items-center px-6">
                <Pressable
                    onPress={(e) => e.stopPropagation()}
                    style={{ maxHeight: height * 0.8, width: width * 0.9 }}
                    className="bg-white rounded-2xl p-4 w-full"
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={80}
                    >
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 16 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Text className="text-xl text-primary font-bold mb-4">{props.language.edit.modal.title}</Text>

                            <View className="relative w-full h-56 mb-4">
                                <Image
                                    source={typeof props.currentItemImg === 'string' ? { uri: props.currentItemImg } : props.currentItemImg}
                                    className="w-full h-full rounded-xl"
                                    resizeMode="cover"
                                />
                            </View>

                            <View className="flex flex-col justify-center gap-4 mb-4">
                                <Text className="text-primary font-bold text-xl">{props.currentItemName}</Text>
                                <Input
                                    label={props.language.edit.modal.stock}
                                    keyboardType="numeric"
                                    placeholder={props.language.edit.modal.stock}
                                    type="number" 
                                    stepperButtons 
                                    value={props.currentStock}
                                    onChangeText={(text) =>
                                        props.setEditStockState(prev => ({ ...prev, currentStock: text }))
                                    }
                                />
                                {props.stockWarn !== '' && (<Text className="text-danger -mt-3">{props.stockWarn}</Text>)}
                            </View>
                        </ScrollView>

                        <View className="flex-row gap-3 mt-4">
                            <CE_Button
                                title={props.language.button.cancel}
                                bgColor="bg-primary"
                                onPress={props.cancelEdit}
                                className="flex-1 py-2"
                                btnClassName="text-sm"
                            />
                            <CE_Button
                                title={props.language.button.save}
                                onPress={() => props.saveEditStock(props.id)}
                                className="flex-1 py-2"
                                btnClassName="text-sm"
                                bgColor="bg-secondary"
                            />
                        </View>
                    </KeyboardAvoidingView>
                </Pressable>
            </Pressable>
        </Modal>
    )
}