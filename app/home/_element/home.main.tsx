import { CE_Button } from "@/components/Button";
import { CE_Loading } from "@/components/Loading";
import { CE_Search } from "@/components/Search";
import { I_Category } from "@/services/api/category/api.category.get.int";
import { API_GetItemByCode } from "@/services/api/item/api.item.get";
import { I_GetMenuResponse, I_Menu } from "@/services/api/item/api.item.get.int";
import { I_Lang } from "@/services/api/other/api.language.int";
import { I_Store } from "@/services/api/store/api.store.int";
import { I_Cart } from "@/services/api/transactional/api.cart.int";
import { I_User } from "@/services/api/user/api.user.get.int";
import { useLocale } from "@/services/function/useLocale";
import { useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    Text,
    View
} from "react-native";
import { searcHItemByCategory, searchItemByName } from "../_function/do.searchItem";
import { locales } from "../locales";
import HomeAddItem from "./home.add.item";
import HomeCartPopup from "./home.cart.popup";
import HomeCatgeoryList from "./home.category.list";
import HomeItemList from "./home.item.list";
import HomeScanner from "./home.scanner";

interface I_Props {
    lang: I_Lang
    userData: I_User
    storeData: I_Store
    itemData: I_GetMenuResponse | null
    categoryData: I_Category[] | null
}

export default function HomeMain(props: I_Props) {
    const language = useLocale(props.lang, locales)
    const [search, setSearch] = useState("");
    const [item, setItem] = useState<I_GetMenuResponse["data"]>(props.itemData?.data ?? []);
    const [selectedCategoryId, setSelectedCategoryId] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [selectedItem, setSelectedItem] = useState<I_Menu | null>(null)
    const [scannerOpen, setScannerOpen] = useState(false)
    const [permission, requestPersmission] = useCameraPermissions()
    const [isCartOpen, setCartOpen] = useState(false)
    const [isAddItemOpen, setAddItemOpen] = useState(false)
    const [cart, setCart] = useState<I_Cart>({ items: [] })

    const categoryList = [{ id: '', name: 'All' }, ...(props.categoryData ?? [])];

    const filterItems = (categoryId: string, searchTerm: string) => {
        setLoading(true);
    
        setTimeout(() => {
            let result = props.itemData?.data ?? [];
    
            if (categoryId !== '') {
                result = searcHItemByCategory(categoryId, result);
            }
    
            if (searchTerm.trim() !== '') {
                result = searchItemByName(searchTerm, result);
            }
    
            setItem(result);
            setLoading(false);
        }, 300);
    };
    
    const selectItemByCategory = (id: string) => {
        const newCategoryId = id === selectedCategoryId ? '' : id
        setSelectedCategoryId(newCategoryId)
        filterItems(newCategoryId, search)
    }    

    useEffect(() => {
        const timeout = setTimeout(() => {
            filterItems(selectedCategoryId, search)
        }, 500);
    
        return () => clearTimeout(timeout)
    }, [search])

    const openScanner = async () => {
        if (permission?.granted) {
            setScannerOpen(true)
        } else {
            const result = await requestPersmission()
            if (result.granted) {
                setScannerOpen(true)
            } else {
                alert(language.scannererror)
            }
        }
    }

    const onProductScanned = async (data: string) => {
        setScannerOpen(false)

        setTimeout(async () => {
            const result = await API_GetItemByCode(data, item ?? [])
            if (result) {
                setSelectedItem(result)
            }
        }, 100)
    }

    useEffect(() => {
        if(selectedItem) {
            setAddItemOpen(true)
        }
    },[selectedItem])

    const handleAddToCart = (id: string, qty: string) => {
        if (!selectedItem) return;

        const parsedQty = parseInt(qty);
        const parsedPrice = parseInt(selectedItem.selling_price);
        const total = parsedQty * parsedPrice;
    
        setCart((prevCart) => {
            const updatedItems = [...(prevCart?.items ?? [])];
            const index = updatedItems.findIndex((i) => i.id === id);
    
            if (index !== -1) {
                updatedItems[index].qty = qty;
            } else {
                updatedItems.push({
                    id,
                    image: selectedItem.image,
                    name: selectedItem.name,
                    total_price: total.toString(),
                    price: selectedItem.selling_price,
                    qty,
                });
            }            
    
            return { items: updatedItems };
        });
    
        setAddItemOpen(false);
        setSelectedItem(null);
    };    

    const removeItemFromCart = (id: string) => {
        setCart(prev => ({
            items: prev.items.filter(item => item.id !== id)
        }));
        setAddItemOpen(false)
        setSelectedItem(null)
    };    

    return (
        <View className="min-h-screen">
            <View className="flex flex-row justify-between items-center mb-3 mx-5">
                <View className="flex flex-row gap-2 items-center">
                    <Text className="text-primary font-bold text-2xl">
                        {props.userData.name.length > 20
                            ? props.userData.name.slice(0, 20) + '...'
                            : props.userData.name}
                    </Text>
                    <Text>|</Text>
                    <Text className="text-secondary font-semibold text-lg">
                        {props.userData.id === props.storeData.owner_id ? language.acctype.owner : language.acctype.cashier}
                    </Text>
                </View>
                <Pressable onPress={() => setCartOpen(true)} className="relative">
                    <Image 
                        source={require('@/assets/icons/shopping-cart.png')}
                        style={{ width: 20, height: 20 }} 
                    />
                    {cart.items.length > 0 && (
                        <View className="absolute -top-2 -right-2 bg-red-500 rounded-full px-1.5">
                            <Text className="text-white text-xs font-bold">
                                {cart.items.length}
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>

            <View className="flex flex-row items-center mx-5 mb-2 gap-4">
                <View className="flex-1">
                    <CE_Search
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
                <Pressable onPress={() => openScanner()}> 
                    <Image 
                        source={require('@/assets/icons/scan.png')} 
                        style={{ width: 24, height: 24 }}  
                    />
                </Pressable>
            </View>

            <HomeCatgeoryList 
                categoryData={props.categoryData}
                categoryList={categoryList}
                selectedCategoryId={selectedCategoryId}
                selectItemByCategory={(id) => selectItemByCategory(id)}
            />

            {isLoading ? (
                <CE_Loading />
            ) : 
                (item && item.length > 0) ? (
                    <HomeItemList 
                        language={language}
                        item={item} 
                        selectedItem={(data) => setSelectedItem(data)}
                        cartItem={cart}    
                    />
                ) : (
                    <View className="flex w-full justify-center items-center mt-10">
                        <Text className="mb-2 font-semibold text-lg">There is no item</Text>
                        {(props.userData.id === props.storeData.owner_id) && (
                            <CE_Button title="Add Item" className="w-2/3" />
                        )}
                    </View>
                )
            }

            <HomeCartPopup 
                language={language}
                isOpen={isCartOpen} 
                setClose={() => setCartOpen(false)}
                cartItem={cart}
            />
            <HomeAddItem 
                language={language}
                item={selectedItem} 
                isOpen={isAddItemOpen} 
                setClose={() => {
                    setAddItemOpen(false)
                    setSelectedItem(null)
                }}
                setItem={handleAddToCart}
                removeItem={removeItemFromCart}
                cartItem={
                    selectedItem
                        ? cart.items.find(ci => ci.id === selectedItem.id) ?? null
                        : null
                }
            />

            {(scannerOpen && permission?.granted) && (
                <HomeScanner 
                    language={language}
                    visible={scannerOpen} 
                    onClose={() => setScannerOpen(false)}
                    onScan={(data) => onProductScanned(data)}
            /> )}
        </View>
    );
}
