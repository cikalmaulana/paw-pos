import { CE_Button } from "@/components/Button"
import { I_Store } from "@/services/api/store/api.store.int"
import { I_Receipt } from "@/services/api/transactional/api.receipt.int"
import { Image, Text, View } from "react-native"

interface I_Props {
    data: I_Receipt
    storeData: I_Store
}

export default function StorePreviewReceipt({ data, storeData }: I_Props) {
    const cashierName = "Andi"
    const paymentMethod = "QRIS"

    const now = new Date()
    const receiptNumber = `STRK-${now.getFullYear()}${(now.getMonth()+1)
        .toString()
        .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-001`

    const dateTimeString = now.toLocaleString("id-ID", {
        weekday: undefined,
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZoneName: "short"
    })

    const print = () => {

    }

    return (
        <View className="flex flex-col gap-4">

            <View className="bg-white rounded-md p-4 shadow w-[280px] mx-auto">
                <View className="items-center mb-2">
                    <Image 
                        source={typeof data.logo === "number" ? data.logo : { uri: data.logo }}
                        style={{ width: 80, height: 80, resizeMode: "contain" }}
                    />
                </View>

                <View className="items-center mb-3">
                    <Text className="text-center font-bold text-base">{storeData.name}</Text>
                    <Text className="text-center text-xs">{storeData.address}</Text>
                    {storeData.phone && (
                        <Text className="text-center text-xs">Telp: {storeData.phone}</Text>
                    )}
                </View>

                <View className="mb-3">
                    <Text className="text-xs">No Struk: {receiptNumber}</Text>
                    <Text className="text-xs">Tanggal: {dateTimeString}</Text>
                    <Text className="text-xs">Kasir: {cashierName}</Text>
                </View>

                <Text className="text-lg font-bold text-center mb-2">{data.title}</Text>

                <View className="my-2 space-y-1">
                    <View className="flex flex-row justify-between">
                        <Text className="font-semibold">1x Nasi Goreng</Text>
                        <Text className="font-semibold">Rp25.000</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="font-semibold">2x Ice Tea</Text>
                        <Text className="font-semibold">Rp5.000</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="font-semibold">1x Martabak</Text>
                        <Text className="font-semibold">Rp35.000</Text>
                    </View>
                    <View className="w-full border border-gray-600 my-2"></View>
                    <View className="flex flex-row justify-between">
                        <Text className="font-semibold">Tax & Service (10%): </Text>
                        <Text className="font-semibold">Rp6.500</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Text className="font-semibold">Discount (10%): </Text>
                        <Text className="font-semibold">Rp7.150</Text>
                    </View>
                    <View className="w-full border border-gray-600 my-2"></View>
                    <View className="flex flex-row justify-between">
                        <Text className="font-semibold">Total: </Text>
                        <Text className="font-semibold">Rp64.350</Text>
                    </View>
                    <View className="flex flex-row justify-between mt-1">
                        <Text className="font-semibold">Pembayaran: </Text>
                        <Text className="font-semibold">{paymentMethod}</Text>
                    </View>
                </View>

                {data.note ? (
                    <Text className="text-xs text-gray-500 mt-2 italic">Note: {data.note}</Text>
                ) : null}

                {data.promo ? (
                    <Text className="text-xs text-gray-500 italic">Promo: {data.promo}</Text>
                ) : null}

                <Text className="text-center text-sm mt-4">{data.footer}</Text>
            </View>

            <CE_Button title="Print" onPress={print}/>
        </View>
    )
}
