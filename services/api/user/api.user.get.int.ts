import { I_CommonMeta } from "../api.common.int"
import { I_Membership } from "../membership/api.membership.int"

export interface I_GetUserRequest{
    user_id: string
}

export interface I_GetUserResponse {
    meta: I_CommonMeta
    data: I_User
}

export interface I_User {
    id: string;
    name: string;
    phone: string;
    address?: string;
    age?: number;
    user_type: string;
    membership: I_Membership;
}

export interface I_EditUserRequest {
    id: string
    name?: string
    phone?: string
}

export interface I_EditUserResponse {
    meta: I_CommonMeta
    data: I_User
}

export interface I_ChangePasswordRequest {
    id: string
    oldPass: string
    newPass: string
}

export interface I_ChangePasswordResponse {
    meta: I_CommonMeta
}