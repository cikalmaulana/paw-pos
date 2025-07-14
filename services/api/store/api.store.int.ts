
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
    discount: I_Discount
}

export interface I_Discount {
    is_active: boolean           
    value: number                // nominal diskon (bisa % atau angka fix)
    type: "percentage" | "fixed" 
    name?: string                
    min_order?: number           // minimum pembelian untuk diskon berlaku
    description?: string         // keterangan tambahan
}

export interface I_StoreAdmin {
    id: string
    user_id: string
}