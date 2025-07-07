import { I_GetStoreResponse, I_SetAsAdminRequest, I_SetAsAdminResponse, I_SetStoreDetailRequest, I_SetStoreDetailResponse } from "./api.store.int";

export async function API_GetStoreById(store_id: string): Promise<I_GetStoreResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Get Store Success"
        },
        data: {
            id: "1",
            owner_id: "1",
            name: "John Doe Store",
            address: "Jl. Abc",
            balance: "8000000",
            admins: []
        }
    }
}

export async function API_GetStoreByOwner(owner_id: string): Promise<I_GetStoreResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Get Store Success"
        },
        data: {
            id: "1",
            owner_id: "1",
            name: "John Doe Store",
            address: "Jl. Abc",
            balance: "8000000",
            admins: []
        }
    }
}

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