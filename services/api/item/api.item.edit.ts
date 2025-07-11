import { I_EditItemRequest, I_EditItemResponse, I_EditStockRequest } from "./api.item.edit.int";

export async function API_EditItem(payload: I_EditItemRequest): Promise<I_EditItemResponse>{
    return {
        meta: { status: "success", code: 200, message: "OK" },
    }
}

export async function API_EditStock(payload: I_EditStockRequest): Promise<I_EditItemResponse>{
    return {
        meta: { status: "failed", code: 400, message: "FAILED" },
    }
}