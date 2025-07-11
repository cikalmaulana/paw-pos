import { I_CommonMeta } from "../api.common.int"

export interface I_EditItemRequest{
    id: string
    image?: number | null
    name?: string
    price?: string
    description?: string
}

export interface I_EditItemResponse{
    meta: I_CommonMeta
}

export interface I_EditStockRequest{
    id: string
    stock: number
}