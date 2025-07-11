import { I_Category } from "@/services/api/api.category.int";
import { I_Menu } from "@/services/api/api.item.get.int";

export const searchItemByName = (name: string, item: I_Menu[]) => {
    if (!name.trim()) return item;

    return item.filter((i) =>
        i.name.toLowerCase().includes(name.toLowerCase())
    )
}

export const searchCategoryByName = (name: string, item: I_Category[]) => {
    if (!name.trim()) return item;

    return item.filter((i) =>
        i.name.toLowerCase().includes(name.toLowerCase())
    )
}