import { I_CommonMeta } from "./api.common.int";
import { I_Membership } from "./api.membership.int";

export interface I_GetUserRequest{
    user_id: string
}

export interface I_GetUserResponse {
    meta: I_CommonMeta
    data: I_User
}

export interface I_User {
    id: string
    name: string
    phone: string
    user_type: string
    membership: I_Membership
}