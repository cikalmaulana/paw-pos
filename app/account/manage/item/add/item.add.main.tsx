import { CE_BackButton } from "@/components/BackButton";
import { API_AddItem } from "@/services/api/item/api.item.add";
import { I_AddItemRequest } from "@/services/api/item/api.item.add.int";
import { useRef } from "react";
import { View } from "react-native";
import { locales } from "../locales";
import ItemAddForm, { ItemAddFormHandles } from "./_element/item.add.form";

interface I_Props {
    language: typeof locales["id"]
    hahandleBack: (item: string) => void
    setShowAlert: (open: boolean) => void
    setAlertMsg: (msg: string) => void
    setAlertSuccess: (success: boolean) => void
}

export default function AddNewItem(props: I_Props) {
    const formRef = useRef<ItemAddFormHandles>(null)

    const saveItem = async (formData: {
        name: string;
        sellingPrice: string;
        costPrice: string;
        stock: string;
        desc: string;
        image: string | number;
        code: string;
    }) => {
        const payload: I_AddItemRequest = {
            name: formData.name,
            cost_price: formData.costPrice,
            selling_price: formData.sellingPrice,
            stock: formData.stock,
            description: formData.desc,
            image: typeof formData.image === "number" ? formData.image : undefined,
            code: formData.code
        }

        const result = await API_AddItem(payload);
        if (result && result.meta.status === "success") {
            alertSetup("Add new item success!", true)
            safetyBack()
            return
        }

        alertSetup("Connection lost.", false)
    }

    const safetyBack = () => {
        formRef.current?.resetForm()
        props.hahandleBack("")
    }

    const alertSetup = (msg: string, isSuccess: boolean) => {
        props.setAlertMsg(msg);
        props.setAlertSuccess(isSuccess)
        props.setShowAlert(true)
    }

    return (
        <View>
            <CE_BackButton lable={props.language.add.title} onPress={safetyBack} />
            <ItemAddForm 
                language={props.language}
                ref={formRef} 
                onSubmit={saveItem} 
                alertSetup={alertSetup}
            />
        </View>
    );
}
