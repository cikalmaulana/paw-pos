import { I_CommonMeta } from "../api.common.int"

export interface I_GetReportResponse{
    meta: I_CommonMeta
    data: I_Report
}

export interface I_Report {
    total: I_ReportTotal
}

interface I_ReportTotal {
    income: string
    daily: string
    weekly: string
    monthly: string
}

export interface I_GetTransactionReportResponse {
    meta: I_CommonMeta
    data: I_TransactionReport[]
}

export interface I_TransactionReport {
    invoice_no: string
    date: string
    cashier_name: string
    total: string
    items: I_TransactionItem[]
}

export interface I_TransactionItem{
    name: string
    cost_price: string
    selling_price: string
    qty: number
}

export interface I_ProfitAndLossRequest{
    store_id: string
    date_start: string
    date_end: string
}

export interface I_ProfitAndLossResponse{
    meta: I_CommonMeta
    data: I_ProfitAndLoss
}

export interface I_ProfitAndLoss{
    gross_revenue: string // total omset
    total_cost: string // total modal
    gross_profit: string //laba kotor
    net_income: string // laba bersih 
}