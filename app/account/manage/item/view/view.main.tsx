import { CE_BackButton } from "@/components/BackButton"
import { CE_Loading } from "@/components/Loading"
import { CE_Search } from "@/components/Search"
import { API_DeleteItem } from "@/services/api/item/api.item.delete"
import { API_EditItem } from "@/services/api/item/api.item.edit"
import { I_EditItemRequest, I_EditItemResponse } from "@/services/api/item/api.item.edit.int"
import { API_GetAllItem } from "@/services/api/item/api.item.get"
import { I_Menu } from "@/services/api/item/api.item.get.int"
import { useEffect, useState } from "react"
import { View } from "react-native"
import ItemDelete from "./_element/view.delete"
import ItemEdit from "./_element/view.edit"
import ItemList from "./_element/view.list"
import { pickImage } from "./_function/do.pickImage"
import { searchItemByName } from "./_function/do.searchItem"

interface I_Props{
    handleBack:()=>void
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
}

export type EditData = {
    currentItemName: string
    currentItemImg: string | number
    currentItemPrice: string
    currentItemDesc: string
}

export type EditDataWarn = {
    currentItemNameWarn: string
    currentItemImgWarn: string
    currentItemPriceWarn: string
}

export default function ManageItemView(props: I_Props) {
    const [editData, setEditData] = useState<EditData>({
        currentItemName: '',
        currentItemImg: '',
        currentItemPrice: '',
        currentItemDesc: ''
    })

    const [editDataWarn, setEditDataWarn] = useState<EditDataWarn>({
        currentItemNameWarn: '',
        currentItemImgWarn: '',
        currentItemPriceWarn: ''
    })

    const [openModal, setOpenModal] = useState({
        editItem: false,
        deleteItem: false
    })

    const [filterState, setFilterState] = useState({
        search: "",
        filteredItems: [] as I_Menu[],
        totalData: 0,
        isLoading: false
    })    
    
    const [itemData, setItemData] = useState<I_Menu[] | null>(null)
    const [selectedItem, setSelectedItem] = useState<I_Menu | null>(null)
    const [refreshing, setRefreshing] = useState(false)
    const [firstOpen, setFirstOpen] = useState(true)

    useEffect(() => {
        if(firstOpen) {
            setFirstOpen(false)
            return
        }
        const timeout = setTimeout(() => {
            filterItems(filterState.search)
        }, 500);
    
        return () => clearTimeout(timeout)
    }, [filterState.search])

    useEffect(() => {
        if (selectedItem) {
            setEditData({
                currentItemName: selectedItem.name,
                currentItemImg: selectedItem.image,
                currentItemPrice: String(selectedItem.price),
                currentItemDesc: selectedItem.description || ''
            })
        }
    }, [selectedItem])

    useEffect(() => {
        getItemData()
    },[])

    const filterItems = (searchTerm: string) => {
        setFilterState(prev => ({
            ...prev,
            isLoading: true
        }))
    
        setTimeout(() => {
            let result = itemData ?? [];
    
            if (searchTerm.trim() !== '') {
                result = searchItemByName(searchTerm, result);
            }

            setFilterState(prev => ({
                ...prev,
                filteredItems: result,
                totalData:result.length,
                isLoading:false
            }))
        }, 300);
    };

    const getItemData = async () => {
        try{
            const result = await API_GetAllItem()
            if(result){
                if(result.meta.status !== 'success' || result.data == null ) {
                    alertSetup("Connection lost.", false)
                    return
                }

                setItemData(result.data)
                setFilterState(prev => ({
                    ...prev,
                    filteredItems: result.data ?? [],
                    totalData: result.data?.length ?? 0,
                }))
            } else {
                alertSetup("Connection lost.", false)
                return
            }
        } catch(error) {
            console.error("Failed to get item data on Manage Item.")
            alertSetup("Connection lost.", false)
        }
    }

    const doDelete = async (id: string) => {
        const result = await API_DeleteItem(id)
        doAlert(result, "Delete item success!")
        await onRefresh()
        closeModal()
    }

    const doEditItem = async (id: string) => {
        const warn: EditDataWarn = {
            currentItemNameWarn: '',
            currentItemImgWarn: '',
            currentItemPriceWarn: '',
        }
    
        let hasError = false
    
        if (!editData.currentItemName.trim()) {
            warn.currentItemNameWarn = 'Nama item tidak boleh kosong'
            hasError = true
        }
    
        if (!editData.currentItemPrice.trim()) {
            warn.currentItemPriceWarn = 'Harga item tidak boleh kosong'
            hasError = true
        }

        if (hasError) {
            setEditDataWarn(warn)
            return
        }

        setFilterState(prev => ({
            ...prev,
            search: ''
        }))
    
        setEditDataWarn({
            currentItemNameWarn: '',
            currentItemImgWarn: '',
            currentItemPriceWarn: '',
        })
    
        const payload: I_EditItemRequest = {
            id: id,
            name: editData.currentItemName,
            image: typeof editData.currentItemImg === 'number' ? editData.currentItemImg : null,
            price: editData.currentItemPrice,
            description: editData.currentItemDesc
        }
    
        const result = await API_EditItem(payload)
        doAlert(result, "Update Item success!")
        await onRefresh()
        closeModal()
    }
    
    const doAlert = (result: I_EditItemResponse, msg: string) => {
        const isSuccess = result && result.meta.status === 'success'
        alertSetup(isSuccess ? msg : "Connection lost.", isSuccess)
        closeModal()
    }
    
    const alertSetup = (msg: string, isSuccess: boolean) => {
        props.setAlertMsg(msg)
        props.setAlertSuccess(isSuccess)
        props.setShowAlert(true)
    }

    const closeModal = () => {
        setOpenModal({ editItem: false, deleteItem: false });
        setEditData({ currentItemName: '', currentItemImg: '', currentItemPrice: '', currentItemDesc: '' });
        setSelectedItem(null);
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getItemData()
        setRefreshing(false)
    }

    return (
        <View>
            <CE_BackButton lable="View All Item" onPress={() => props.handleBack()}/>
            <View className="flex flex-row items-center mb-4 gap-4">
                <View className="flex-1">
                    <CE_Search
                        value={filterState.search}
                        onChangeText={(text) => {
                            setFilterState(prev => ({
                                ...prev,
                                search: text
                            }))
                        }}
                    />
                </View>
            </View>

            {filterState.isLoading ? <CE_Loading /> : (
                <ItemList 
                    refreshing={refreshing}
                    totalData={filterState.totalData}
                    filteredItems={filterState.filteredItems}
                    onRefresh={onRefresh}
                    setSelectedItem={setSelectedItem}
                    setOpenModal={setOpenModal}
                />
            )}

            {selectedItem && (
                <ItemDelete 
                    modalOpen={openModal.deleteItem}
                    selectedItem={selectedItem}
                    doDelete={doDelete}
                    setOpenModal={setOpenModal}
                />
            )}

            {selectedItem && (
                <>
                    <ItemEdit 
                        modalOpen={openModal.editItem}
                        selectedItem={selectedItem}
                        editDataWarn={editDataWarn}
                        editData={editData}
                        closeModal={closeModal}
                        doEditItem={doEditItem}
                        pickImage={() => pickImage((uri) =>
                            setEditData((prev) => ({ ...prev, currentItemImg: uri }))
                        )}
                        setEditData={setEditData}
                    />
                </>
            )}
        </View>
    )
}