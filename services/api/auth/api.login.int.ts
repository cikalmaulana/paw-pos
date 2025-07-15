import { I_CommonMeta } from "../api.common.int"
import { I_Lang } from "../other/api.language.int"
import { I_Store } from "../store/api.store.int"
import { I_User } from "../user/api.user.get.int"

export interface I_LoginRequest{
    phone: string
    password: string
}

export interface I_LoginResponse{
    meta: I_CommonMeta
    user: I_User | null
}

export interface I_LoginData{
    token: string
    user: I_User
    store: I_Store
    expiredAt: number
    lang: I_Lang
}