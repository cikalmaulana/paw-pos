import { I_CommonMeta } from "../api.common.int"

export interface I_RegisterResponse{
    meta: I_CommonMeta
}

export interface I_RegisterRequest{
    name: string
    phone: string
    password: string
    age?: number
    address?: string
}