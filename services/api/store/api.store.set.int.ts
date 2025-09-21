import { I_CommonMeta } from "../api.common.int"
import { I_Discount, I_Store } from "./api.store.int"

//Request
export interface I_SetStoreDetailRequest{
    user_id: string
    name: string
    address: string
    phone?: string
}

export interface I_SetAsAdminRequest {
    store_id: string
    user_id: string
}

//Response
export interface I_SetStoreDetailResponse{
    meta: I_CommonMeta
    data: I_Store
}

export interface I_SetAsAdminResponse {
    meta: I_CommonMeta
}

export interface I_UpdateDiscountRequest {
    store_id: string
    data: I_Discount
}

export interface I_UpdateDIscountResponse {
    meta: I_CommonMeta
}
