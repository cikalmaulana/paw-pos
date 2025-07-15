import HomeScanner from "@/app/home/_element/home.scanner";
import { CE_Button } from "@/components/Button";
import { CE_Dropdown } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { API_GetAllCategory } from "@/services/api/category/api.category.get";
import { I_Category } from "@/services/api/category/api.category.get.int";
import { API_AddCategory } from "@/services/api/category/api.category.set";
import { I_EditCategoryResponse } from "@/services/api/category/api.category.set.int";
import { useCameraPermissions } from 'expo-camera';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import CategoryAddNew from "../../category/_element/category.add";
import { pickImage } from "../_function/do.pickImage";

export interface ItemAddFormHandles {
    resetForm: () => void;
}

interface I_Props {
    onSubmit: (data: {
        name: string,
        sellingPrice: string,
        costPrice: string,
        stock: string,
        desc: string,
        image: string | number,
        code: string
    }) => void;
    alertSetup:(msg: string, isSuccess: boolean)=>void
}

const ItemAddForm = forwardRef<ItemAddFormHandles, I_Props>((props, ref) => {
    useImperativeHandle(ref, () => ({
        resetForm: () => {
            setForm({
                image: '',
                name: '',
                stock: '',
                desc: '',
                code: '',
                nameWarn: '',
                priceWarn: '',
                stockWarn: '',
                cost_price: '',
                selling_price: '',
                unit_type: '',
                category: undefined,
                costPriceWarn: '',
                sellingPriceWarn: '',
            });
        }
    }));

    const [form, setForm] = useState({
        image: '' as string | number,
        name: '',
        stock: '',
        desc: '',
        code: '',
        nameWarn: '',
        priceWarn: '',
        stockWarn: '',
        cost_price: '',
        selling_price: '',
        unit_type: '',
        category: undefined as I_Category | undefined,
        costPriceWarn: '',
        sellingPriceWarn: '',
    });

    const [scannerOpen, setScannerOpen] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [categoryData, setCategoryData] = useState<I_Category[] | undefined>()
    const [addNewCategory, setAddNewCategory] = useState({
        addCatModalOpen: false,
        newCategoryName: '',
        newCategoryNameWarn: '',
    })

    const updateForm = (field: keyof typeof form, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        getAllCategory()
    },[])

    const getAllCategory = async () => {
        const result = await API_GetAllCategory()
        if (result && result.meta.status === 'success') {
            if (result.data === null) {
                props.alertSetup(result.meta.message, false)
                return
            }
    
            setCategoryData(result.data)
        } else {
            props.alertSetup("Connection lost.", false)
        }
    }

    const cancelEdit = () => {
        safetyClose()
    }
    
    const safetyClose = () => {
        setAddNewCategory({
            addCatModalOpen: false,
            newCategoryName: '',
            newCategoryNameWarn: ''
        })
    }

    const openScanner = async () => {
        if (permission?.granted) {
            setScannerOpen(true);
        } else {
            const result = await requestPermission();
            if (result.granted) setScannerOpen(true);
            else alert("Akses kamera ditolak.");
        }
    };

    const handleScan = (data: string) => {
        setScannerOpen(false);
        updateForm("code", data);
    };

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

        if(result && result.meta.status === 'success') {
            getAllCategory()
        }
    }    

    const doAlert = (result: I_EditCategoryResponse, msg: string) => {
        const isSuccess = result && result.meta.status === 'success'
        props.alertSetup(isSuccess ? msg : "Connection lost.", isSuccess)
        safetyClose()
    }

    const handleSubmit = () => {
        if (form.name === '') return updateForm("nameWarn", "Name cannot be empty!")
        else updateForm("nameWarn", "")
        if (form.cost_price === '') return updateForm("costPriceWarn", "Cost price cannot be empty!")
        else updateForm("costPriceWarn", "")
        if (form.selling_price === '') return updateForm("sellingPriceWarn", "Selling price cannot be empty!")
        else updateForm("sellingPriceWarn", "")
        
        props.onSubmit({
            name: form.name,
            costPrice: form.cost_price,
            sellingPrice: form.selling_price,
            stock: form.stock,
            desc: form.desc,
            image: form.image,
            code: form.code
        });
    };

    return (
        <>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                keyboardVerticalOffset={100}
            >
                <ScrollView 
                    contentContainerStyle={{ paddingBottom: 700 }} 
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex flex-row">
                        <Text className="text-primary font-bold mb-4">Add Image</Text>
                        <Text className="text-xs text-gray-500">*Optional</Text>
                    </View>
                    <View className="relative w-full h-56 mb-4">
                        <Image
                            source={typeof form.image === 'string' ? { uri: form.image } : form.image}
                            className="w-full h-full rounded-xl"
                            resizeMode="cover"
                        />
                        <Pressable 
                            onPress={() =>
                                pickImage((uri) => updateForm("image", uri))
                            }
                            className="absolute inset-0 items-center justify-center"
                        >
                            <Text className="text-secondary border border-secondary px-3 py-1 rounded-full bg-white/60 text-lg">
                                {form.image === '' ? "Choose Image" : "Change Image"}
                            </Text>
                        </Pressable>
                    </View>

                    <View className="gap-4 mb-4">
                        <Input 
                            label="Name" 
                            placeholder="Name"
                            value={form.name} 
                            onChangeText={text => updateForm("name", text)} 
                        />
                        {form.nameWarn && <Text className="text-danger -mt-3">{form.nameWarn}</Text>}

                        <Input 
                            label="Cost Price" 
                            placeholder="Cost Price"
                            value={form.cost_price} 
                            keyboardType="numeric" 
                            onChangeText={text => updateForm("cost_price", text)} 
                            hint="Hanya berisi angka. Contoh 20000 untuk Rp20.000"
                        />
                        {form.priceWarn && <Text className="text-danger -mt-3">{form.priceWarn}</Text>}

                        <Input 
                            label="Selling Price" 
                            placeholder="Selling Price"
                            value={form.selling_price} 
                            keyboardType="numeric" 
                            onChangeText={text => updateForm("selling_price", text)} 
                            hint="Hanya berisi angka. Contoh 20000 untuk Rp20.000"
                        />
                        {form.priceWarn && <Text className="text-danger -mt-3">{form.priceWarn}</Text>}

                        <Input 
                            label="Unit" 
                            placeholder="cth: pcs / kg"
                            value={form.unit_type} 
                            onChangeText={text => updateForm("unit_type", text)} 
                            optional={true}
                        />

                        <View className="flex flex-row gap-3 items-end">
                            <View className="flex-1">
                                <CE_Dropdown
                                    label="Category" // hilangkan label atasnya
                                    selected={
                                        categoryData?.find(cat => cat.id === form.category?.id)?.name ?? ''
                                    }
                                    options={
                                        categoryData?.map(cat => ({
                                            label: cat.name,
                                            value: cat.id
                                        })) || []
                                    }
                                    onSelect={(val) => {
                                        const selected = categoryData?.find(cat => cat.id === val);
                                        if (selected) updateForm("category", selected);
                                    }}
                                />
                            </View>

                            <CE_Button
                                title="Add"
                                bgColor="bg-secondary"
                                className="px-4"
                                onPress={() => setAddNewCategory(prev => ({
                                    ...prev,
                                    addCatModalOpen: true
                                }))}
                            />
                        </View>

                        <Input 
                            label="Description" 
                            placeholder="Description"
                            value={form.desc} 
                            multiline={true}
                            numberOfLines={3} 
                            optional={true}
                            onChangeText={text => updateForm("desc", text)} 
                        />

                        <Input 
                            label="Stock" 
                            placeholder="Stock"
                            value={form.stock} 
                            keyboardType="numeric" 
                            type="number"
                            optional={true}
                            stepperButtons={true}
                            onChangeText={text => updateForm("stock", text)} 
                        />
                        {form.stockWarn && <Text className="text-danger -mt-3">{form.stockWarn}</Text>}

                        <View className="flex-row gap-2 items-center">
                            <Pressable onPress={openScanner} className="flex-row items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-primary">
                                <Image source={require('@/assets/icons/scan.png')} style={{ width: 24, height: 24 }} />
                                <Text>{form.code ? "Change Barcode" : "Add Barcode"}</Text>
                                <Text className="text-xs text-gray-500 -ms-1">*Optional</Text>
                            </Pressable>
                            {form.code && <Text className="text-primary font-semibold">Code: {form.code}</Text>}
                        </View>
                    </View>

                    <CE_Button title="Save" onPress={handleSubmit} className="py-2" />

                    <CategoryAddNew 
                        addCatModalOpen={addNewCategory.addCatModalOpen}
                        newCategoryName={addNewCategory.newCategoryName}
                        newCategoryNameWarn={addNewCategory.newCategoryNameWarn}
                        cancelEdit={cancelEdit}
                        saveAddCategory={saveAddCategory}
                        setAddNewCategory={setAddNewCategory}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

            {(scannerOpen && permission?.granted) && (
                <HomeScanner visible={scannerOpen} onClose={() => setScannerOpen(false)} onScan={handleScan} />
            )}
        </>
    );
})

export default ItemAddForm;