import { I_GetReportResponse, I_GetTransactionReportResponse, I_ProfitAndLossRequest, I_ProfitAndLossResponse } from "./api.report.int";

export async function API_GetReport(id: string): Promise<I_GetReportResponse>{
    return {
        meta: {
            status: "success",
            code: 200,
            message: "OK"
        },
        data: {
            total: {
                income: "1200000",
                daily: "150000",
                weekly: "800000",
                monthly: "2500000"
            }
        }
    };
}

export async function API_GetTransactionReport(id: string): Promise<I_GetTransactionReportResponse>{
    return {
        meta: {
            status: "success",
            code: 200,
            message: "OK"
        },
        data: [
            {
                invoice_no: "INV-001",
                date: "2025-07-20",
                cashier_name: "Ari",
                total: "150000",
                items: [
                    {
                        name: "Indomie Goreng",
                        cost_price: "2000",
                        selling_price: "3000",
                        qty: 10,
                    },
                    {
                        name: "Teh Botol",
                        cost_price: "3000",
                        selling_price: "5000",
                        qty: 5,
                    },
                ],
            },
            {
                invoice_no: "INV-002",
                date: "2025-07-19",
                cashier_name: "Dina",
                total: "95000",
                items: [
                    {
                        name: "Roti Tawar",
                        cost_price: "6000",
                        selling_price: "8000",
                        qty: 3,
                    },
                    {
                        name: "Susu UHT",
                        cost_price: "7000",
                        selling_price: "9000",
                        qty: 5,
                    },
                ],
            },
        ],
    }
}

export async function API_GetProfitAndLossReport(payload: I_ProfitAndLossRequest): Promise<I_ProfitAndLossResponse>{
    return {
        meta: {
            status: "success",
            code: 200,
            message: "OK"
        },
        data: {
            gross_profit: "3200000",      // Laba kotor = revenue - HPP
            total_cost: "4800000",        // Total modal (COGS)
            gross_revenue: "8000000",     // Omzet total dari penjualan
            net_income: "2100000",        // Laba bersih = laba kotor - biaya lainnya
        }
    }
}