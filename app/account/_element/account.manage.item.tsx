import { CE_BackButton } from "@/components/BackButton";
import { CE_Card } from "@/components/Card";
import { useState } from "react";
import { Text, View } from "react-native";
import { ManageItemList } from "./account.manage.item.list";

interface I_Props {
    handleBack:()=>void
}

export function ManageItem(props: I_Props){
    const itemList = [
        { key: 'viewItem', label: 'View all item', image:require("@/assets/icons/viewItem.png") },
        { key: 'editStock', label: 'Edit stock', image:require("@/assets/icons/editStock.png")  },
        { key: 'categories', label: 'Categories', image:require("@/assets/icons/categories.png")  },
        { key: 'lowStock', label: 'View low stock', image:require("@/assets/icons/lowStock.png")  },
    ]

    const [manageItemOpen, setManageItemOpen] = useState('')

    return (
        <View>
            <CE_BackButton lable="Manage Item" onPress={props.handleBack}/>
            <View className="flex flex-row gap-4 w-full mb-8 px-2">
                <CE_Card className="bg-primary p-5 flex justify-center flex-1">
                    <Text className="text-white font-semibold text-lg">Total Item</Text>
                    <Text className="text-white font-semibold text-3xl">100</Text>
                </CE_Card>
                <CE_Card className="bg-white p-5 flex justify-center flex-1">
                    <Text className="text-primary font-semibold text-lg">Total Low Stock</Text>
                    <Text className="text-primary font-semibold text-3xl">4</Text>
                </CE_Card>
            </View>

            <ManageItemList setManageItemOpen={setManageItemOpen} manageItemList={itemList}/>

            {manageItemOpen }
        </View>
    )
}