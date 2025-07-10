import { CE_BackButton } from "@/components/BackButton";
import { CE_Button } from "@/components/Button";
import { CE_Loading } from "@/components/Loading";
import { CE_Search } from "@/components/Search";
import { API_AddCategory, API_EditCategory, API_GetAllCategory } from "@/services/api/api.category";
import { I_Category, I_EditCategoryRequest, I_EditCategoryResponse } from "@/services/api/api.category.int";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { searchCategoryByName } from "../../../../_function/do.searchItem";
import CategoryAddNew from "./manage.category.add";
import CategoryEdit from "./manage.category.edit";
import CategoryList from "./manage.category.list";

interface I_Props{
    handleBack:()=>void
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
}

export default function ManageItemCategories(props: I_Props){
    const [addNewCategory, setAddNewCategory] = useState({
        addCatModalOpen: false,
        newCategoryName: '',
        newCategoryNameWarn: '',
    })

    const [editCategory, setEditCategory] = useState({
        editCategoryOpen: false,
        currentCategoryName: '',
        currentCategoryNameWarn: ''
    })

    const [categoryData, setCategoryData] = useState<I_Category[] | undefined>()
    const [filteredCategory, setFilteredCategory] = useState<I_Category[]>([])
    const [isLoading, setLoading] = useState(false)
    const [search, setSearch] = useState("");
    const [firstOpen, setFirstOpen] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<I_Category | null>(null)

    useEffect(() => {
        if (firstOpen) {
            setFirstOpen(false)
            return
        }
    
        const timeout = setTimeout(() => {
            filterCategory(search)
        }, 500)
    
        return () => clearTimeout(timeout)
    }, [search])
    
    const filterCategory = (searchTerm: string) => {
        setLoading(true)
    
        setTimeout(() => {
            let result = categoryData ?? []
    
            if (searchTerm.trim() !== '') result = searchCategoryByName(searchTerm, result)
    
            setFilteredCategory(result)
            setLoading(false)
        }, 300)
    }

    const validateCategoryName = (
        name: string,
        setWarning: (msg: string) => void
    ): boolean => {
        const trimmed = name.trim()
        if (!trimmed) {
            setWarning("Category name can not be empty!")
            return false
        }
        setWarning("")
        return true
    }    
    
    useEffect(() => {
        getAllCategory()
    }, [])
    
    const onRefresh = async () => {
        setRefreshing(true)
        await getAllCategory()
        setRefreshing(false)
    }
    
    const getAllCategory = async () => {
        const result = await API_GetAllCategory()
        if (result && result.meta.status === 'success') {
            if (result.data === null) {
                alertSetup(result.meta.message, false)
                return
            }
    
            setCategoryData(result.data)
            setFilteredCategory(result.data)
        } else {
            alertSetup("Connection lost.", false)
        }
    }
    
    const alertSetup = (msg: string, isSuccess: boolean) => {
        props.setAlertMsg(msg)
        props.setAlertSuccess(isSuccess)
        props.setShowAlert(true)
    }
    
    const cancelEdit = () => {
        safetyClose()
    }
    
    const safetyClose = () => {
        setEditCategory({
            editCategoryOpen: false,
            currentCategoryName: '',
            currentCategoryNameWarn: ''
        })
        setAddNewCategory({
            addCatModalOpen: false,
            newCategoryName: '',
            newCategoryNameWarn: ''
        })
        setSelectedCategory(null)
    }
    
    const saveAddCategory = async () => {
        const isValid = validateCategoryName(
            addNewCategory.newCategoryName,
            (msg) =>
                setAddNewCategory((prev) => ({
                    ...prev,
                    newCategoryNameWarn: msg
                }))
        )
        if (!isValid) return
    
        const result = await API_AddCategory(addNewCategory.newCategoryName)
        doAlert(result, "Add new category success!")
    }    
    
    const saveEditCategory = async (id: string) => {
        const isValid = validateCategoryName(
            editCategory.currentCategoryName,
            (msg) =>
                setEditCategory((prev) => ({
                    ...prev,
                    currentCategoryNameWarn: msg
                }))
        )
        if (!isValid) return
    
        const payload: I_EditCategoryRequest = {
            id,
            name: editCategory.currentCategoryName
        }
    
        const result = await API_EditCategory(payload)
        doAlert(result, "Update success!")
    }    
    
    const doAlert = (result: I_EditCategoryResponse, msg: string) => {
        const isSuccess = result && result.meta.status === 'success'
        alertSetup(isSuccess ? msg : "Connection lost.", isSuccess)
        safetyClose()
    }

    return (
        <View>
            <CE_BackButton lable="Manage Categories" onPress={() => props.handleBack()}/>
            <View className="flex flex-row items-center mb-4 gap-4">
                <View className="flex-1">
                    <CE_Search
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
            </View>

            <CE_Button
                title="Add New Category"
                className="mb-3"
                onPress={() => setAddNewCategory(prev => ({
                    ...prev,
                    addCatModalOpen: true
                }))}
            />

            {isLoading ? <CE_Loading /> : (
                <CategoryList 
                    refreshing={refreshing}
                    filteredCategory={filteredCategory}
                    setSelectedCategory={setSelectedCategory}
                    setEditCategory={setEditCategory}
                    onRefresh={onRefresh}
                />
            )}
            
            {selectedCategory && (
                <CategoryEdit 
                    editCategoryOpen={editCategory.editCategoryOpen}
                    currentCategoryName={editCategory.currentCategoryName}
                    currentCategoryNameWarn={editCategory.currentCategoryNameWarn}
                    id={selectedCategory.id}
                    cancelEdit={cancelEdit}
                    saveEditCategory={saveEditCategory}
                    setAddNewCategory={setEditCategory}
                />
            )}
            
            <CategoryAddNew 
                addCatModalOpen={addNewCategory.addCatModalOpen}
                newCategoryName={addNewCategory.newCategoryName}
                newCategoryNameWarn={addNewCategory.newCategoryNameWarn}
                cancelEdit={cancelEdit}
                saveAddCategory={saveAddCategory}
                setAddNewCategory={setAddNewCategory}
            />
        </View> 
    )
}