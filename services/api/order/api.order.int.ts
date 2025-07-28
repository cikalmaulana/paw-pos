import { I_CommonMeta } from "../api.common.int";
import { I_CartItem } from "../transactional/api.cart.int";

export interface I_GetOrderListResponse{
    meta: I_CommonMeta
    data: I_Order[] | null
}

export interface I_Order{
    id: string
    invoice_no: string
    status: string // "Done", "On Proccess", "Cancel"
    payment_method: string
    cashier_name?: string
    note?: string
    customer_data?: I_CustomerData
    table_no?: string
    total_price: string
    items: I_CartItem[]
    created_at: string
    updated_at?: string
}

export interface I_CustomerData{
    name: string
    phone: string
}