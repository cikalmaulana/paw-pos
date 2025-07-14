import { I_GetReceiptSettingResponse, I_SetReceiptSettingRequest, I_SetReceiptSettingResponse } from "./api.receipt.int";

export async function API_GetReceiptSetting(id: string): Promise<I_GetReceiptSettingResponse>{
    return {
        meta: {
            status: "success",
            code: 200,
            message: "OK"
        },
        data: {
            logo: require('@/assets/images/logo.jpg'),
            title: "Struk Pembayaran",
            footer: "Terima kasih sudah berbelanja!",
            note: "Belanja puas, harga pas!",
            promo: "Discount 10% untuk pembelanjaan selanjutnya! Tunjukan struk pada kasir."
        }
    }
}

export async function API_SetReceiptSetting(payload: I_SetReceiptSettingRequest): Promise<I_SetReceiptSettingResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "OK"
        }
    }
}