import { API_GetOngoingOrderList } from "@/services/api/order/api.order.get"
import { I_GetOrderListResponse } from "@/services/api/order/api.order.int"

export const doGetOngoingOrderList = async (id: string): Promise<I_GetOrderListResponse | null> => {
    try {
        const result = await API_GetOngoingOrderList(id)
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