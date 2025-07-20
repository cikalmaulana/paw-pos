import { I_GetStoreAdmin, I_GetStoreResponse, I_GetStoreSettingResponse } from "./api.store.get.int"

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
                currency: "IDR",
                discount: {
                    is_active: true,
                    value: 10,
                    type: "percentage",
                    name: "Diskon Spesial Juli",
                    min_order: 50000,
                    description: "Diskon berlaku untuk pembelian di atas Rp50.000"
                }
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
                currency: "IDR",
                discount: {
                    is_active: true,
                    value: 10,
                    type: "percentage",
                    name: "Diskon Spesial Juli",
                    min_order: 50000,
                    description: "Diskon berlaku untuk pembelian di atas Rp50.000"
                }
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
            currency: "IDR",
            discount: {
                is_active: true,
                value: 10,
                type: "percentage",
                name: "Diskon Spesial Juli",
                min_order: 50000,
                description: "Diskon berlaku untuk pembelian di atas Rp50.000"
            }
        }
    }
}

export async function API_GetStoreAdmin(store_id: string): Promise<I_GetStoreAdmin> {
    return {
        meta: { status: "success", code: 200, message: "OK" },
        data: [
            {
                id: "2",
                name: "Steven Doe",
                phone: "081234567891",
                user_type: "admin",
                membership: {
                    is_member: true,
                    member_type: "basic",
                    date_joined: "2025-07-07T01:13:46.123Z",
                    date_expired: "2025-08-07T01:13:46.123Z",
                }
            },
            {
                id: "3",
                name: "Carla Doe",
                phone: "081234567892",
                user_type: "admin",
                membership: {
                    is_member: true,
                    member_type: "basic",
                    date_joined: "2025-07-07T01:13:46.123Z",
                    date_expired: "2025-08-07T01:13:46.123Z",
                }
            }, 
            {
                id: "4",
                name: "Kevin Doe",
                phone: "081234567893",
                user_type: "admin",
                membership: {
                    is_member: true,
                    member_type: "basic",
                    date_joined: "2025-07-07T01:13:46.123Z",
                    date_expired: "2025-08-07T01:13:46.123Z",
                }
            }
        ]
    }
}