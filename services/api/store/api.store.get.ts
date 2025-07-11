import { I_GetStoreResponse, I_GetStoreSettingResponse } from "./api.store.get.int"

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
            phone: "08123456789",
            balance: "8000000",
            setting: {
                store_type: "grocery",
                need_ongoing_order: true,
                need_table_no: true,
                currency: "IDR"
            },
            admins: [],
            created_at: "2025-07-11T08:00:00.000Z",
            updated_at: "2025-07-11T08:00:00.000Z"
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
            phone: "08123456789",
            balance: "8000000",
            setting: {
                store_type: "grocery",
                need_ongoing_order: true,
                need_table_no: true,
                currency: "IDR"
            },
            admins: [],
            created_at: "2025-07-11T08:00:00.000Z",
            updated_at: "2025-07-11T08:00:00.000Z"
        }
    }    
}

export async function API_GetStoreSetting(id: string): Promise<I_GetStoreSettingResponse> {
    return {
        meta: { status: "success", code: 200, message: "OK" },
        data: {
            store_type: "grocery",
            need_ongoing_order: false,
            need_table_no: false,
            currency: "IDR"
        }
    }
}