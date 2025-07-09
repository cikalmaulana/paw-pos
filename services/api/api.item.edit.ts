import { I_EditItemRequest, I_EditItemResponse } from "./api.item.edit.int";

export async function API_EditItem(payload: I_EditItemRequest): Promise<I_EditItemResponse>{
    return {
        meta: { status: "success", code: 200, message: "OK" },
    }
}