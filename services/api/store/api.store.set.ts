import { I_SetAsAdminRequest, I_SetAsAdminResponse, I_SetStoreDetailRequest, I_SetStoreDetailResponse } from "./api.store.set.int"

export async function API_SetStoreDetail(payload: I_SetStoreDetailRequest): Promise<I_SetStoreDetailResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Set Store Detail Success"
        }
    }
}

export async function API_SetAsAdmin(payload: I_SetAsAdminRequest): Promise<I_SetAsAdminResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Set As Admin Success"
        }
    }
}