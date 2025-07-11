import { I_CommonMeta } from "../api.common.int"

//Request
export interface I_SetStoreDetailRequest{
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
}

export interface I_SetAsAdminResponse {
    meta: I_CommonMeta
}

