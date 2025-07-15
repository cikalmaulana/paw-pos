import HomeScanner from "@/app/home/_element/home.scanner";
import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useCameraPermissions } from 'expo-camera';
import { forwardRef, useImperativeHandle, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { pickImage } from "../_function/do.pickImage";

export interface ItemAddFormHandles {
    resetForm: () => void;
}

interface I_Props {
    onSubmit: (data: {
        name: string,
        price: string,
        stock: string,
        desc: string,
        image: string | number,
        code: string
    }) => void;
}

const ItemAddForm = forwardRef<ItemAddFormHandles, I_Props>((props, ref) => {
    useImperativeHandle(ref, () => ({
        resetForm: () => {
            setForm({
                image: '',
                name: '',
                price: '',
                stock: '',
                desc: '',
                code: '',
                nameWarn: '',
                priceWarn: '',
                stockWarn: '',
            });
        }
    }));

    const [form, setForm] = useState({
        image: '' as string | number,
        name: '',
        price: '',
        stock: '',
        desc: '',
        code: '',
        nameWarn: '',
        priceWarn: '',
        stockWarn: '',
    });

    const [scannerOpen, setScannerOpen] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    const updateForm = (field: keyof typeof form, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

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

    const handleSubmit = () => {
        if (form.name === '') return updateForm("nameWarn", "Name cannot be empty!")
        else updateForm("nameWarn", "")
        if (form.price === '') return updateForm("priceWarn", "Price cannot be empty!")
        else updateForm("priceWarn", "")
        
        props.onSubmit({
            name: form.name,
            price: form.price,
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
                            label="Price" 
                            placeholder="Price"
                            value={form.price} 
                            keyboardType="numeric" 
                            onChangeText={text => updateForm("price", text)} 
                        />
                        <Text className="-mt-3">Contoh "20000" untuk Rp20.000</Text>
                        {form.priceWarn && <Text className="text-danger -mt-3">{form.priceWarn}</Text>}

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
                </ScrollView>
            </KeyboardAvoidingView>

            {(scannerOpen && permission?.granted) && (
                <HomeScanner visible={scannerOpen} onClose={() => setScannerOpen(false)} onScan={handleScan} />
            )}
        </>
    );
})

export default ItemAddForm;