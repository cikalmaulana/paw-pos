import { API_GetAllCategory } from "@/services/api/api.category"
import { I_GetCategoryResponse } from "@/services/api/api.category.int"

export const doGetCategory = async (): Promise<I_GetCategoryResponse | null> => {
    try {
        const result = await API_GetAllCategory()
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