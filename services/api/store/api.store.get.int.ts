import { I_CommonMeta } from "../api.common.int"
import { I_Store, I_StoreSetting } from "./api.store.int"

//Request
export interface I_GetStoreRequest{
    store_id: string
}

//Response

export interface I_GetStoreSettingResponse {
    meta: I_CommonMeta
    data: I_StoreSetting
}

export interface I_GetStoreResponse{
    meta: I_CommonMeta
    data: I_Store
}