import { I_CommonMeta } from "../api.common.int"

export interface I_AddItemRequest {
    name: string
    image?: number
    price: string
    description?: string
    stock: string
    code?: string
}

export interface I_AddItemResponse{
    meta: I_CommonMeta
}