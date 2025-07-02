import { I_CommonMeta } from "./api.common.int"

export interface I_Store{
    id: string
    owner_id: string
    name: string
    address: string
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