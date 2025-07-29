import { CE_BackButton } from "@/components/BackButton";
import { CE_Loading } from "@/components/Loading";
import { CE_Search } from "@/components/Search";
import { API_EditStock } from "@/services/api/item/api.item.edit";
import { I_EditStockRequest } from "@/services/api/item/api.item.edit.int";
import { API_GetAllItem } from "@/services/api/item/api.item.get";
import { I_Menu } from "@/services/api/item/api.item.get.int";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { locales } from "../locales";
import StockEdit from "./_element/stock.item.edit";
import StockItemList from "./_element/stock.item.list";
import { searchItemByName } from "./_function/do.searchItem";

interface I_Props{
    language: typeof locales["id"]
    handleBack:()=>void
    setupAlert:(msg: string, isSuccess: boolean)=>void
}

type EditStockState = {
    editItemModalOpen: boolean
    currentItemImg: string | number
    currentItemName: string
    currentStock: string
    stockWarn: string
}

type ItemState = {
    itemData: I_Menu[] | null
    filteredItems: I_Menu[]
    totalData: number
    isLoading: boolean
    refreshing: boolean
    firstOpen: boolean
}

export default function ManageItemEditStock(props: I_Props) {
    const [search, setSearch] = useState("")
    const [selectedItem, setSelectedItem] = useState<I_Menu | null>(null)

    const [editStockState, setEditStockState] = useState<EditStockState>({
        editItemModalOpen: false,
        currentItemImg: '',
        currentItemName: '',
        currentStock: '',
        stockWarn: '',
    })

    const [itemState, setItemState] = useState<ItemState>({
        itemData: null,
        filteredItems: [],
        totalData: 0,
        isLoading: false,
        refreshing: false,
        firstOpen: true,
    })

    useEffect(() => {
        getItemData()
    }, [])

    useEffect(() => {
        if (itemState.firstOpen) {
            setItemState(prev => ({ ...prev, firstOpen: false }))
            return
        }
    
        const timeout = setTimeout(() => filterItems(search), 500)
        return () => clearTimeout(timeout)
    }, [search])

    useEffect(() => {
        if (!selectedItem) return
        setEditStockState(prev => ({
            ...prev,
            currentItemName: selectedItem.name,
            currentItemImg: selectedItem.image,
        }))
    }, [selectedItem])

    const getItemData = async () => {
        try {
            const result = await API_GetAllItem()
            if (result?.meta.status !== 'success' || !result.data) {
                return props.setupAlert("Connection lost.", false)
            }
        
            setItemState(prev => ({
                ...prev,
                itemData: result.data,
                filteredItems: result.data ?? [],
                totalData: (result.data ?? []).length,
            }))
        } catch {
            console.error("Failed to get item data.")
            props.setupAlert("Connection lost.", false)
        }
    }

    const filterItems = (searchTerm: string) => {
        setItemState(prev => ({ ...prev, isLoading: true }))
    
        setTimeout(() => {
            const allItems = itemState.itemData ?? []
            const result = searchTerm.trim()
                ? searchItemByName(searchTerm, allItems)
                : allItems
        
            setItemState(prev => ({
                ...prev,
                filteredItems: result,
                totalData: result.length,
                isLoading: false,
            }))
        }, 300)
    }

    const onRefresh = async () => {
        setItemState(prev => ({ ...prev, refreshing: true }))
        await getItemData()
        setItemState(prev => ({ ...prev, refreshing: false }))
    }

    const saveEditStock = async (id: string) => {
        if (!editStockState.currentStock.trim()) {
            return setEditStockState(prev => ({ ...prev, stockWarn: 'Stock can not empty!' }))
        }
    
        setEditStockState(prev => ({ ...prev, stockWarn: '' }))
    
        const payload: I_EditStockRequest = {
            id,
            stock: parseInt(editStockState.currentStock.trim()),
        }
    
        const result = await API_EditStock(payload)
        if (result?.meta.status === 'success') {
            props.setupAlert('Edit stock success!', true)
        } else {
            props.setupAlert('Connection lost.', false)
        }
    
        onRefresh()
        safetyClose()
    }

    const cancelEdit = () => safetyClose()

    const safetyClose = () => {
        setEditStockState(prev => ({
            ...prev,
            editItemModalOpen: false,
            currentStock: '',
        }))
        setSelectedItem(null)
    }

    return (
        <View>
            <CE_BackButton lable={props.language.edit.title} onPress={() => props.handleBack()}/>
            <View className="flex flex-row items-center mb-4 gap-4">
                <View className="flex-1">
                    <CE_Search
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
            </View>

            {itemState.isLoading ? <CE_Loading /> : (
                <StockItemList 
                    language={props.language}
                    refreshing={itemState.refreshing}
                    totalData={itemState.totalData}
                    filteredItems={itemState.filteredItems}
                    onRefresh={onRefresh}
                    setSelectedItem={setSelectedItem}
                    setEditStockState={setEditStockState}
                />
            )}

            {selectedItem && (
                <StockEdit 
                    language={props.language}
                    id={selectedItem.id}
                    editItemModalOpen={editStockState.editItemModalOpen}
                    currentItemImg={editStockState.currentItemImg}
                    currentItemName={editStockState.currentItemName}
                    currentStock={editStockState.currentStock}
                    stockWarn={editStockState.stockWarn}
                    cancelEdit={cancelEdit}
                    saveEditStock={saveEditStock}
                    setEditStockState={setEditStockState}
                />
            )}
        </View> 
    )
}