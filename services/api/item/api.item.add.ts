import { I_AddItemRequest, I_AddItemResponse } from "./api.item.add.int";

export async function API_AddItem(payload: I_AddItemRequest): Promise<I_AddItemResponse>{
    return {
        meta: { status: "success", code: 200, message: "OK" },
    }
}