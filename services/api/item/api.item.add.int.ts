import { I_CommonMeta } from "../api.common.int"
import { I_Category } from "../category/api.category.get.int"

export interface I_AddItemRequest {
    code?: string
    name: string
    description?: string
    image?: number
    cost_price: string
    selling_price: string
    unit_type?: string
    category?: I_Category
    stock?: string
}

export interface I_AddItemResponse{
    meta: I_CommonMeta
}