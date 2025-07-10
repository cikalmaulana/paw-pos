import { I_CommonMeta } from "./api.common.int"

export interface I_GetCategoryResponse{
    meta: I_CommonMeta
    data: I_Category[] | null
}

export interface I_Category{
    id: string
    name: string
}

export interface I_EditCategoryRequest{
    id: string
    name: string
}

export interface I_EditCategoryResponse{
    meta: I_CommonMeta
}