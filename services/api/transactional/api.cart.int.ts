export interface I_Cart{
    items: I_CartItem[]
}

export interface I_CartItem{
    id: string
    name: string
    image: number
    total_price: string
    price: string
    qty: string
}