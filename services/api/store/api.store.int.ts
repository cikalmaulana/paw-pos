
export interface I_Store {
    id: string
    owner_id: string
    name: string
    address: string
    phone?: string
    balance: string
    setting: I_StoreSetting
    admins: I_StoreAdmin[]
    created_at: string
    updated_at: string
}

export interface I_StoreSetting {
    store_type: string 
    need_ongoing_order: boolean
    need_table_no: boolean
    currency: string  
}

export interface I_StoreAdmin {
    id: string
    user_id: string
}