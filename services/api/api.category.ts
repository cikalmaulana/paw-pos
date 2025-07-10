import { I_EditCategoryRequest, I_EditCategoryResponse, I_GetCategoryResponse } from "./api.category.int";

export async function API_GetAllCategory(): Promise<I_GetCategoryResponse>{
    return {
        meta: { status: "success", code: 200, message: "OK" },
        data: [
            {
                id: "c1",
                name: "Coffee"
            },
            {
                id: 'c2',
                name: "Non-Coffee"
            },
            {
                id: 'c3',
                name: 'Pastry'
            }
        ],
    }
}

export async function API_EditCategory(payload:I_EditCategoryRequest): Promise<I_EditCategoryResponse> {
    return {
        meta: { status: "success", code: 200, message: "OK" },
    }
}
