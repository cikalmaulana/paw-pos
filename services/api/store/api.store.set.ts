import { I_SetAsAdminRequest, I_SetAsAdminResponse, I_SetStoreDetailRequest, I_SetStoreDetailResponse, I_UpdateDiscountRequest, I_UpdateDIscountResponse } from "./api.store.set.int";

export async function API_SetNewStore(
    payload: I_SetStoreDetailRequest
): Promise<I_SetStoreDetailResponse> {
    const uri = "http://192.168.1.4:3000/graphql"

    console.log("API_SetNewStore PAYLOAD: ", payload)
    const query = `
        mutation CreateStore($input: CreateStoreInput!) {
            createStore(input: $input) {
                meta {
                    status
                    message
                    code
                }
                data {
                    _id
                    owner_id
                    name
                    address
                    phone
                    balance
                    setting {
                        store_type
                        need_ongoing_order
                        need_table_no
                        currency
                        discount {
                            is_active
                            value
                            type
                            name
                            min_order
                            description
                        }
                    }
                    admins {
                        id
                        user_id
                    }
                    created_at
                    updated_at
                }
            }
        }
    `;

    const response = await fetch(uri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query,
            variables: { input: payload },
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    return json.data.createStore as I_SetStoreDetailResponse
}

export async function API_SetAsAdmin(payload: I_SetAsAdminRequest): Promise<I_SetAsAdminResponse> {
    return {
        meta: {
            status: "success",
            code: 200,
            message: "Set As Admin Success"
        }
    }
}

export async function API_UpdateDiscountSetting(payload: I_UpdateDiscountRequest): Promise<I_UpdateDIscountResponse>{
    return {
        meta: {
            status: "success",
            code: 200,
            message: "OK"
        }
    } 
}