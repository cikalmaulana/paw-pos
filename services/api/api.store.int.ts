import { I_CommonMeta } from "./api.common.int"

export interface I_Store{
    id: string
    owner_id: string
    name: string
    address: string
    balance: string
    phone?: string
    admins: I_StoreAdmin[]
}

export interface I_StoreAdmin {
    id: string;
    user_id: string;
}

export interface I_GetStoreResponse{
    meta: I_CommonMeta
    data: I_Store
}

export interface I_GetStoreRequeset{
    store_id: string
}

export interface I_SetStoreDetailRequest{
    name: string
    address: string
    phone?: string
}

export interface I_SetStoreDetailResponse{
    meta: I_CommonMeta
}

export interface I_SetAsAdminRequest {
    store_id: string
    user_id: string
}

export interface I_SetAsAdminResponse {
    meta: I_CommonMeta
}