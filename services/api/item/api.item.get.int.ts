
import { I_CommonMeta } from "../api.common.int"
import { I_Category } from "../category/api.category.get.int"

export interface I_GetMenuResponse {
    meta: I_CommonMeta
    data: I_Menu[] | null
}

export interface I_Menu{
    id: string
    code: string
    name: string
    description: string
    image: number
    cost_price: string
    selling_price: string
    unit_type: string
    category: I_Category
    stock?: number
}

export interface I_GetTotalItemResponse {
    meta: I_CommonMeta
    totalItem: number
}

export interface I_GetMostSellingProductResponse{
    meta: I_CommonMeta
    data: I_MostSellingProduct[]
}

export interface I_MostSellingProduct{
    id: string
    name: string
    image: number
    cost_price: string
    selling_price: string
    total_selling: string
}