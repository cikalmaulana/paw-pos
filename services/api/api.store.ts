import { I_GetStoreResponse } from "./api.store.int";

export async function API_GetStoreById(store_id: string): Promise<I_GetStoreResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Register Success"
        },
        data: {
            id: "1",
            owner_id: "1",
            name: "John Doe Store",
            address: "Jl. Abc",
            admins: []
        }
    }
}

export async function API_GetStoreByOwner(owner_id: string): Promise<I_GetStoreResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Register Success"
        },
        data: {
            id: "1",
            owner_id: "1",
            name: "John Doe Store",
            address: "Jl. Abc",
            admins: []
        }
    }
}