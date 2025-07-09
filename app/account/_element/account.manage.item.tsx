import { CE_BackButton } from "@/components/BackButton";
import { CE_Card } from "@/components/Card";
import { I_Menu } from "@/services/api/api.item.get.int";
import { I_Store } from "@/services/api/api.store.int";
import { useState } from "react";
import { Text, View } from "react-native";
import { ManageItemList } from "./account.manage.item.list";
import ManageItemView from "./account.manage.item.view";

interface I_Props {
    handleBack:()=>void
    storeData: I_Store
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
}

export default function ManageItem(props: I_Props){
    const itemList = [
        { key: 'viewItem', label: 'View all item', image:require("@/assets/icons/viewItem.png") },
        { key: 'addItem', label: 'Add new item', image:require("@/assets/icons/addItem.png") },
        { key: 'editStock', label: 'Edit stock', image:require("@/assets/icons/editStock.png")  },
        { key: 'categories', label: 'Categories', image:require("@/assets/icons/categories.png")  },
        { key: 'lowStock', label: 'View low stock', image:require("@/assets/icons/lowStock.png")  },
    ]

    const [itemData, setItemData] = useState<I_Menu[] | null>(null)
    const [totalData, setTotalData] = useState(0)
    const [deletItemModalOpen, setDeleteItemModalOpen] = useState(false)
    const [manageItemOpen, setManageItemOpen] = useState('')



    return (
        <View>

            {manageItemOpen === '' ? (
                <>
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
                </>
            ) : manageItemOpen === 'viewItem' ? (
                <ManageItemView 
                    handleBack={() => setManageItemOpen('')}
                    setShowAlert={props.setShowAlert}
                    setAlertMsg={props.setAlertMsg}
                    setAlertSuccess={props.setAlertSuccess}
                />
            ) : manageItemOpen === 'addItem' ? (
                <View>
                    <CE_BackButton lable="Add New Item" onPress={() => setManageItemOpen('')}/>
                </View> 
            ) : manageItemOpen === 'editStock' ? (
                <View>
                    <CE_BackButton lable="Edit Stock" onPress={() => setManageItemOpen('')}/>
                </View> 
            ) : manageItemOpen === 'categories' ? (
                <View>
                    <CE_BackButton lable="Manage Categories" onPress={() => setManageItemOpen('')}/>
                </View> 
            ) : manageItemOpen === 'lowStock' && (
                <View>
                    <CE_BackButton lable="View Low Stock" onPress={() => setManageItemOpen('')}/>
                </View> 
            )}
        </View>
    )
}