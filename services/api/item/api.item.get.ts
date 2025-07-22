import { I_GetMenuResponse, I_GetMostSellingProductResponse, I_GetTotalItemResponse, I_Menu } from "./api.item.get.int";

export async function API_GetItemByCode(code: string, item: I_Menu[]): Promise<I_Menu> {
    const foundItem = item.find((itm) => itm.code === code);

    if (!foundItem) {
        throw new Error(`Item dengan kode '${code}' tidak ditemukan`);
    }

    return foundItem;
}

export async function API_GetItemById(id: string): Promise<I_GetMenuResponse>{
    return {
        meta: { status: "success", code: 200, message: "OK" },
        data: [{
            id: "1",
            code: "ITEM001",
            name: "Espresso Single Shot",
            description: "Espresso murni dengan rasa pahit dan pekat.",
            image: require('@/assets/images/expresso.jpeg'),
            cost_price: "15000",
            selling_price: "18000",
            unit_type: "pcs",
            category: { id: "c1", name: "Coffee" },
            stock: 20,
        }],
    }
}

export async function API_GetTotalItem(): Promise<I_GetTotalItemResponse> {
    return {
        meta: { status: "success", code: 200, message: "OK" },
        totalItem: 11
    }
}

export async function API_GetAllItem(): Promise<I_GetMenuResponse> {
    return {
        meta: { status: "success", code: 200, message: "OK" },
        data: [
            {
                id: "1",
                code: "ITEM001",
                name: "Espresso Single Shot",
                description: "Espresso murni dengan rasa pahit dan pekat.",
                image: require('@/assets/images/expresso.jpeg'),
                cost_price: "15000",
                selling_price: "18000",
                unit_type: "pcs",
                category: { id: "c1", name: "Coffee" },
                stock: 20,
            },
            {
                id: "2",
                code: "ITEM002",
                name: "Cappuccino",
                description: "Espresso dengan steamed milk dan foam.",
                image: require('@/assets/images/capucino.jpeg'),
                cost_price: "22000",
                selling_price: "25000",
                unit_type: "pcs",
                category: { id: "c1", name: "Coffee" },
                stock: 18,
            },
            {
                id: "3",
                code: "ITEM003",
                name: "Iced Caramel Latte",
                description: "Kopi susu dengan saus karamel dan es.",
                image: require('@/assets/images/iced-caramel-latte.jpeg'),
                cost_price: "25000",
                selling_price: "28000",
                unit_type: "pcs",
                category: { id: "c1", name: "Coffee" },
                stock: 5,
            },
            {
                id: "4",
                code: "ITEM004",
                name: "Matcha Latte",
                description: "Matcha Jepang dengan susu segar.",
                image: require('@/assets/images/matcha-latte.jpeg'),
                cost_price: "24000",
                selling_price: "30000",
                unit_type: "pcs",
                category: { id: "c2", name: "Non-Coffee" },
                stock: 7,
            },
            {
                id: "5",
                code: "ITEM005",
                name: "Choco Frappe",
                description: "Minuman coklat dingin dengan whipped cream.",
                image: require('@/assets/images/choco-frappe.jpeg'),
                cost_price: "30000",
                selling_price: "32000",
                unit_type: "pcs",
                category: { id: "c2", name: "Non-Coffee" },
                stock: 0,
            },
            {
                id: "6",
                code: "ITEM006",
                name: "Croissant Butter",
                description: "Croissant renyah dengan mentega asli.",
                image: require('@/assets/images/croissant-butter.jpeg'),
                cost_price: "19000",
                selling_price: "22000",
                unit_type: "pcs",
                category: { id: "c3", name: "Pastry" },
                stock: 8,
            },
            {
                id: "7",
                code: "ITEM007",
                name: "Chocolate Muffin",
                description: "Muffin coklat dengan potongan dark chocolate.",
                image: require('@/assets/images/choco-muffin.jpeg'),
                cost_price: "15000",
                selling_price: "18000",
                unit_type: "pcs",
                category: { id: "c3", name: "Pastry" },
                stock: 12,
            },
            {
                id: "8",
                code: "ITEM008",
                name: "Tiramisu Cake Slice",
                description: "Potongan kue tiramisu klasik dengan kopi.",
                image: require('@/assets/images/tiramisu.jpeg'),
                cost_price: "31000",
                selling_price: "35000",
                unit_type: "pcs",
                category: { id: "c3", name: "Pastry" },
                stock: 5,
            },
            {
                id: "9",
                code: "ITEM009",
                name: "Americano",
                description: "Espresso yang dicampur air panas.",
                image: require('@/assets/images/americano.jpeg'),
                cost_price: "18000",
                selling_price: "20000",
                unit_type: "pcs",
                category: { id: "c1", name: "Coffee" },
                stock: 20,
            },
            {
                id: "10",
                code: "ITEM010",
                name: "Vanilla Cold Brew",
                description: "Cold brew dengan sentuhan vanilla manis.",
                image: require('@/assets/images/vanilla-cold.jpeg'),
                cost_price: "25000",
                selling_price: "30000",
                unit_type: "pcs",
                category: { id: "c1", name: "Coffee" },
                stock: 10,
            },
            {
                id: "11",
                code: "ITEM011",
                name: "Iced Lemon Tea",
                description: "Lemon Tea dengan Es.",
                image: require('@/assets/images/iced-tea.jpeg'),
                cost_price: "20000",
                selling_price: "22000",
                unit_type: "pcs",
                category: { id: "c2", name: "Non-Coffee" },
                stock: 10,
            },
        ],
    };
}

export async function API_GetMostSellingProduct(storeId: string): Promise<I_GetMostSellingProductResponse> {
    return {
        meta: { status: "success", code: 200, message: "OK" },
        data: [
            {
                id: "1",
                name: "Espresso Single Shot",
                image: require('@/assets/images/expresso.jpeg'),
                cost_price: "15000",
                selling_price: "18000",
                total_selling: "120"
            },
            {
                id: "2",
                name: "Cappuccino",
                image: require('@/assets/images/capucino.jpeg'),
                cost_price: "22000",
                selling_price: "25000",
                total_selling: "110"
            },
            {
                id: "3",
                name: "Iced Caramel Latte",
                image: require('@/assets/images/iced-caramel-latte.jpeg'),
                cost_price: "25000",
                selling_price: "28000",
                total_selling: "98"
            },
            {
                id: "4",
                name: "Matcha Latte",
                image: require('@/assets/images/matcha-latte.jpeg'),
                cost_price: "24000",
                selling_price: "30000",
                total_selling: "87"
            },
            {
                id: "5",
                name: "Choco Frappe",
                image: require('@/assets/images/choco-frappe.jpeg'),
                cost_price: "30000",
                selling_price: "32000",
                total_selling: "65"
            },
            {
                id: "6",
                name: "Croissant Butter",
                image: require('@/assets/images/croissant-butter.jpeg'),
                cost_price: "19000",
                selling_price: "22000",
                total_selling: "72"
            },
            {
                id: "7",
                name: "Chocolate Muffin",
                image: require('@/assets/images/choco-muffin.jpeg'),
                cost_price: "15000",
                selling_price: "18000",
                total_selling: "79"
            },
            {
                id: "8",
                name: "Tiramisu Cake Slice",
                image: require('@/assets/images/tiramisu.jpeg'),
                cost_price: "31000",
                selling_price: "35000",
                total_selling: "55"
            },
            {
                id: "9",
                name: "Americano",
                image: require('@/assets/images/americano.jpeg'),
                cost_price: "18000",
                selling_price: "20000",
                total_selling: "85"
            },
            {
                id: "10",
                name: "Vanilla Cold Brew",
                image: require('@/assets/images/vanilla-cold.jpeg'),
                cost_price: "25000",
                selling_price: "30000",
                total_selling: "60"
            },
            {
                id: "11",
                name: "Iced Lemon Tea",
                image: require('@/assets/images/iced-tea.jpeg'),
                cost_price: "20000",
                selling_price: "22000",
                total_selling: "70"
            }
        ]
    };
}
