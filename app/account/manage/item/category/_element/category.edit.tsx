import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Dimensions, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";

interface I_Props{
    editCategoryOpen: boolean
    currentCategoryName: string
    currentCategoryNameWarn: string
    id: string
    cancelEdit:()=>void
    saveEditCategory:(id: string)=>void
    setAddNewCategory: React.Dispatch<React.SetStateAction<{
        editCategoryOpen: boolean,
        currentCategoryName: string,
        currentCategoryNameWarn: string
    }>>
}

export default function CategoryEdit(props: I_Props){
    const { width, height } = Dimensions.get("window")
    
    return (
        <Modal
            visible={props.editCategoryOpen}
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
                            <Text className="text-xl text-primary font-bold mb-4">Edit Category</Text>

                            <View className="flex flex-col justify-center gap-4 mb-4">
                                <Input
                                    label="Category Name"
                                    placeholder="Category name"
                                    stepperButtons 
                                    value={props.currentCategoryName}
                                    onChangeText={(text) =>
                                        props.setAddNewCategory((prev) => ({
                                            ...prev,
                                            currentCategoryName: text
                                        }))
                                    }
                                />
                                {props.currentCategoryNameWarn !== '' && (<Text className="text-danger -mt-3">{props.currentCategoryNameWarn}</Text>)}
                            </View>
                        </ScrollView>

                        <View className="flex-row gap-3 mt-4">
                            <CE_Button
                                title="Cancel"
                                bgColor="bg-primary"
                                onPress={props.cancelEdit}
                                className="flex-1 py-2"
                                btnClassName="text-sm"
                            />
                            <CE_Button
                                title="Save"
                                onPress={() => props.saveEditCategory(props.id)}
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