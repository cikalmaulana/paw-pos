import { I_CommonMeta } from "../api.common.int";

export interface I_GetReceiptSettingResponse {
    meta: I_CommonMeta
    data: I_Receipt
}

export interface I_Receipt {
    logo: number
    title: string
    footer: string
    note: string
    promo?: string
}

export interface I_SetReceiptSettingRequest {
    id: string
    data: I_Receipt
}

export interface I_SetReceiptSettingResponse {
    meta: I_CommonMeta
}