import { I_Menu } from "@/services/api/item/api.item.get.int";

export const searchItemByName = (name: string, item: I_Menu[]) => {
    if (!name.trim()) return item;

    return item.filter((i) =>
        i.name.toLowerCase().includes(name.toLowerCase())
    )
}

export const searchItemById = (id: string) => {

}

export const searcHItemByCategory = (category_id: string, item: I_Menu[]) => {
    return item.filter((menu) => menu.category.id === category_id)
}