import { API_GetAllItem, API_GetItemById } from "@/services/api/api.item.get"
import { I_GetMenuResponse } from "@/services/api/api.item.get.int"

export const doGetItem = async (id: string): Promise<I_GetMenuResponse | null> => {
    try {
        const result = await API_GetItemById(id)
        if(result){
            if(result.meta.status === "success") return result
            
            return {
                meta: result.meta,
                data: null
            }
        }
        return null
    } catch(error) {
        console.error("Failed to catch data: ", error)
        return null
    }
}

export const doGetItems = async (): Promise<I_GetMenuResponse | null> => {
    try {
        const result = await API_GetAllItem()
        if(result){
            if(result.meta.status === "success") return result
            
            return {
                meta: result.meta,
                data: null
            }
        }
        return null
    } catch(error) {
        console.error("Failed to catch data: ", error)
        return null
    }
}