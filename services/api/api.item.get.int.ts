import { I_Category } from "./api.category.int"
import { I_CommonMeta } from "./api.common.int"

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
    price: string
    category: I_Category
    stock: number
}

export interface I_GetTotalItemResponse {
    meta: I_CommonMeta
    totalItem: number
}