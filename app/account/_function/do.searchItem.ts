import { I_Menu } from "@/services/api/api.item.get.int";

export const searchItemByName = (name: string, item: I_Menu[]) => {
    if (!name.trim()) return item;

    return item.filter((i) =>
        i.name.toLowerCase().includes(name.toLowerCase())
    )
}