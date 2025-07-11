import { I_EditCategoryRequest, I_EditCategoryResponse } from "./api.category.set.int";

export async function API_AddCategory(name: string): Promise<I_EditCategoryResponse>{
    return {
        meta: { status: "success", code: 200, message: "OK" },
    }
}

export async function API_EditCategory(payload:I_EditCategoryRequest): Promise<I_EditCategoryResponse> {
    return {
        meta: { status: "success", code: 200, message: "OK" },
    }
}