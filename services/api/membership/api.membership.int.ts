import { I_CommonMeta } from "../api.common.int"
import { I_User } from "../user/api.user.get.int"

export interface I_GetAllMembershipData {
    meta: I_CommonMeta
    data: I_MembershipData[]
}

export interface I_MembershipData{
    id: string
    code: string
    name: string
    duration_in_days: number
    benefit: string[]
}

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
    membership_id: string
}

export interface I_SetMembershipResponse {
    meta: I_CommonMeta;
    data: I_User
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