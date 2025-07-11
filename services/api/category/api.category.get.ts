import { I_GetCategoryResponse } from "./api.category.get.int";

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