import { I_GetOrderListResponse } from "./api.order.int";

export async function API_GetOrderList(storeId: string): Promise<I_GetOrderListResponse> {
    return {
        meta: { status: "success", code: 200, message: "OK" },
        data: [
            {
                id: "order-001",
                invoice_no: "INV-20250728001",
                status: "Done",
                payment_method: "cash",
                cashier_name: "Rina",
                note: "Tanpa sambal",
                customer_data: {
                    name: "Andi",
                    phone: "081234567890"
                },
                table_no: "A1",
                total_price: "75000",
                created_at: "2025-07-28T10:15:00Z",
                updated_at: "2025-07-28T10:45:00Z",
                items: [
                    {
                        id: "item-001",
                        name: "Nasi Goreng",
                        image: 1,
                        price: "25000",
                        qty: "2",
                        total_price: "50000"
                    },
                    {
                        id: "item-002",
                        name: "Es Teh Manis",
                        image: 2,
                        price: "12500",
                        qty: "2",
                        total_price: "25000"
                    }
                ]
            },
            {
                id: "order-002",
                invoice_no: "INV-20250728002",
                status: "Cancel",
                payment_method: "",
                cashier_name: "Budi",
                note: "Batal karena customer buru-buru",
                customer_data: {
                    name: "Siti",
                    phone: "089876543210"
                },
                table_no: "",
                total_price: "0",
                created_at: "2025-07-28T11:00:00Z",
                items: []
            },
            {
                id: "order-003",
                invoice_no: "INV-20250728003",
                status: "On Proccess",
                payment_method: "debit",
                cashier_name: "Wati",
                note: "Tambah extra cheese",
                customer_data: {
                    name: "Doni",
                    phone: "082112345678"
                },
                table_no: "C2",
                total_price: "100000",
                created_at: "2025-07-28T12:00:00Z",
                items: [
                    {
                        id: "item-003",
                        name: "Pizza Large",
                        image: 3,
                        price: "100000",
                        qty: "1",
                        total_price: "100000"
                    }
                ]
            }
        ]
    };
}

export async function API_GetOngoingOrderList(storeId: string): Promise<I_GetOrderListResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "OK",
        },
        data: [
            {
                id: "order-1",
                invoice_no: "INV-001",
                status: "On Proccess",
                payment_method: "Cash",
                cashier_name: "Aldi",
                note: "No chili",
                customer_data: {
                    name: "John Doe",
                    phone: "081234567890",
                },
                table_no: "5",
                total_price: "150000",
                items: [
                    {
                        id: "item-1",
                        name: "Nasi Goreng",
                        image: 1,
                        total_price: "50000",
                        price: "25000",
                        qty: "2",
                    },
                    {
                        id: "item-2",
                        name: "Teh Manis",
                        image: 2,
                        total_price: "20000",
                        price: "10000",
                        qty: "2",
                    },
                ],
                created_at: "2025-07-28T10:30:00Z",
                updated_at: "2025-07-28T10:45:00Z",
            },
            {
                id: "order-2",
                invoice_no: "INV-002",
                status: "On Proccess",
                payment_method: "QRIS",
                cashier_name: "Siti",
                note: "",
                customer_data: {
                    name: "Jane Smith",
                    phone: "089876543210",
                },
                table_no: "3",
                total_price: "120000",
                items: [
                    {
                        id: "item-3",
                        name: "Mie Ayam",
                        image: 3,
                        total_price: "40000",
                        price: "20000",
                        qty: "2",
                    },
                    {
                        id: "item-4",
                        name: "Jus Alpukat",
                        image: 4,
                        total_price: "40000",
                        price: "20000",
                        qty: "2",
                    },
                ],
                created_at: "2025-07-28T11:00:00Z",
                updated_at: "2025-07-28T11:10:00Z",
            },
        ],
    }
}