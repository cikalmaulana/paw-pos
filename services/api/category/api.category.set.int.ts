import { I_CommonMeta } from "../api.common.int"

export interface I_EditCategoryRequest{
    id: string
    name: string
}

export interface I_EditCategoryResponse{
    meta: I_CommonMeta
}