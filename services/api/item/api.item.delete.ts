import { I_DeleteItemResponse } from "./api.item.delete.int";

export async function API_DeleteItem(id: string): Promise<I_DeleteItemResponse> {
    return {
        meta: { status: "success", code: 200, message: "OK" },
    }
}