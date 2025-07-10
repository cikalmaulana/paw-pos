import HomeScanner from "@/app/home/_element/home.scanner";
import { CE_BackButton } from "@/components/BackButton";
import { CE_Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { API_AddItem } from "@/services/api/api.item.add";
import { I_AddItemRequest } from "@/services/api/api.item.add.int";
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";

interface I_Props{
    hahandleBack:(item: string)=>void
    setShowAlert:(open: boolean)=>void
    setAlertMsg:(msg: string)=>void
    setAlertSuccess:(success:boolean)=>void
}

export default function AddNewItem(props: I_Props){
    const [image, setImage] = useState<number | string>('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [stock, setStock] = useState('')
    const [scannerOpen, setScannerOpen] = useState(false)
    const [permission, requestPersmission] = useCameraPermissions()
    const [code, setCode] = useState('')
    const [nameWarn, setNameWarn] = useState('')
    const [priceWarn, setPriceWarn] = useState('')
    const [stockWarn, setStockWarn] = useState('')

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.status !== 'granted') {
            alert('Permission to access camera is required!');
            return;
        }

        Alert.alert(
            "Change Image",
            "Select image source",
            [
                {
                    text: "Camera",
                    onPress: async () => {
                        const result = await ImagePicker.launchCameraAsync({
                        allowsEditing: true,
                        quality: 1,
                        });
            
                        if (!result.canceled) {
                            const asset = result.assets[0];
                            setImage(asset.uri);
                        }
                    },
                },
                {
                    text: "Gallery",
                    onPress: async () => {
                        const result = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        quality: 1,
                        });
            
                        if (!result.canceled) {
                        const asset = result.assets[0];
                        setImage(asset.uri);
                        }
                    },
                },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const openScanner = async () => {
        if (permission?.granted) {
            setScannerOpen(true)
        } else {
            const result = await requestPersmission()
            if (result.granted) {
                setScannerOpen(true)
            } else {
                alert("Akses kamera ditolak. Aktifkan izin kamera untuk menggunakan scanner.")
            }
        }
    }

    const onProductScanned = async (data: string) => {
        setScannerOpen(false)
        setCode(data)
    }

    const saveItem = async () => {
        if(name === '') {
            setNameWarn("Name can not empty!")
            return
        } else setNameWarn('')

        if(price === '') {
            setPriceWarn("Price can not empty!")
            return
        } else setPriceWarn('')

        if(stock === '') {
            setStockWarn("Stock can not empty!")
            return 
        } else setStockWarn('')

        const payload: I_AddItemRequest = {
            name: name, 
            price: price,
            stock: stock,
            description: desc,
            image: typeof image === 'number' ? image : undefined,
            code: code
        }

        const result = await API_AddItem(payload)
        if(result && result.meta.status === 'success') {
            alertSetup("Add new item success!", true)
            safetyBack()
            return
        }

        alertSetup("Connection lost.", false)
        return
    }

    const safetyBack = () => {
        setName('')
        setCode('')
        setDesc('')
        setImage('')
        setNameWarn('')
        setPrice('')
        setPriceWarn('')
        setStock('')
        setStockWarn('')
        props.hahandleBack('')
    }

    const alertSetup = (msg: string, isSuccess: boolean) => {
        props.setAlertMsg(msg)
        props.setAlertSuccess(isSuccess)
        props.setShowAlert(true)
    }

    return (
        <View>
            <CE_BackButton lable="Add New Item" onPress={() => props.hahandleBack('')}/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80}
            >
                
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 700 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex flex-row gap-1">
                        <Text className=" text-primary font-bold mb-4">Add Image</Text>
                        <Text className="text-xs text-gray-500">*optional</Text>
                    </View>
                    <View className="relative w-full h-56 mb-4">
                        <Image
                            source={typeof image === 'string' ? { uri: image } : image}
                            className="w-full h-full rounded-xl"
                            resizeMode="cover"
                        />
                        <Pressable
                            onPress={pickImage}
                            className="absolute inset-0 items-center justify-center"
                        >
                            <Text className="text-secondary border border-secondary px-3 py-1 rounded-full bg-white/60 text-lg">
                                {image === '' ? "Choose Image" : "Change Image"}
                            </Text>
                        </Pressable>
                    </View>

                    <View className="flex flex-col gap-4 mb-4">
                        <Input
                            label="Name"
                            placeholder="Item Name"
                            value={name}
                            onChangeText={setName}
                        />
                        {nameWarn && (<Text className="text-danger font-semibold -mt-3">{nameWarn}</Text>)}

                        <Input
                            label="Price"
                            placeholder="Price"
                            keyboardType="numeric"
                            value={price}
                            onChangeText={setPrice}
                        />
                        <Text className="-mt-3">Harga hanya berisi angka. Contoh "20000" untuk Rp20.000</Text>
                        {priceWarn && (<Text className="text-danger font-semibold -mt-3">{priceWarn}</Text>)}

                        <Input
                            label="Description"
                            placeholder="Description"
                            multiline
                            numberOfLines={3}
                            value={desc}
                            onChangeText={setDesc}
                            optional={true}
                        />

                        <Input
                            label="Stock"
                            keyboardType="numeric"
                            placeholder="Stock"
                            type="number" 
                            stepperButtons 
                            value={stock}
                            onChangeText={setStock}
                        />
                        {stockWarn && (<Text className="text-danger font-semibold -mt-3">{stockWarn}</Text>)}

                        <View className="flex flex-row gap-2 items-center">
                            <Pressable 
                                onPress={() => openScanner()}
                                className="flex flex-row items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-primary"
                            > 
                                <Image 
                                    source={require('@/assets/icons/scan.png')} 
                                    style={{ width: 24, height: 24 }}  
                                />
                                {code === '' ? (
                                    <View className="flex flex-row gap-1">
                                        <Text className="">Add Barcode</Text>
                                        <Text className="text-xs text-gray-500">*optional</Text>
                                    </View>
                                ) : (
                                    <Text>Change Barcode</Text>
                                )}
                            </Pressable>
                            {code !== '' && (<Text className="text-primary font-semibold ">Code: {code}</Text>)}
                        </View>


                    </View>

                    <CE_Button
                        title="Save"
                        onPress={() => saveItem()}
                        className="flex-1 py-2"
                        btnClassName="text-sm"
                        bgColor="bg-primary"
                    />
                </ScrollView>
            </KeyboardAvoidingView>
            
            {(scannerOpen && permission?.granted) && (
                <HomeScanner 
                    visible={scannerOpen} 
                    onClose={() => setScannerOpen(false)}
                    onScan={(data) => onProductScanned(data)}
            /> )}
        </View>
    )
}