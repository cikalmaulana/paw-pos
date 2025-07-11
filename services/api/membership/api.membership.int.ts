import { I_CommonMeta } from "../api.common.int"

export interface I_GetMembershipResponse{
    meta: I_CommonMeta
    data: I_Membership
}

export interface I_Membership {
    is_member: boolean
    member_type: string
    date_joined: string
    date_expired: string
}

export interface I_SetMembershipRequest {
    user_id: string
    member_type: string
}

export interface I_SetMembershipResponse {
    meta: I_CommonMeta
    data: I_Membership
}

export interface I_GetOwnerOTPResponse {
    meta: I_CommonMeta
    data: I_OwnerOTP
}

export interface I_OwnerOTP {
    store_id: string
    otp: string
    expired: string
}