import { I_TransactionReport } from "@/services/api/report/api.report.int"
import { priceFormat } from "@/services/function/formatPrice"
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"

export function useGeneratePDF() {
  const generatePDF = async (data: I_TransactionReport[]) => {
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border: 1px solid #ccc; padding: 8px; font-size: 12px; }
            th { background-color: #f2f2f2; }
            .section { margin-bottom: 40px; }
          </style>
        </head>
        <body>
          <h1>Transaction Report</h1>
          ${data
            .map(
              (trx) => `
                <div class="section">
                  <h2>${trx.invoice_no}</h2>
                  <p><strong>Date:</strong> ${trx.date}</p>
                  <p><strong>Cashier:</strong> ${trx.cashier_name}</p>
                  <p><strong>Total:</strong> ${priceFormat(trx.total, "IDR")}</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${trx.items
                        .map(
                          (item) => `
                            <tr>
                              <td>${item.name}</td>
                              <td>${item.qty}</td>
                              <td>${priceFormat(item.selling_price, "IDR")}</td>
                              <td>${priceFormat(
                                (
                                  Number(item.selling_price) * Number(item.qty)
                                ).toString(),
                                "IDR"
                              )}</td>
                            </tr>
                          `
                        )
                        .join("")}
                    </tbody>
                  </table>
                </div>
              `
            )
            .join("")}
        </body>
      </html>
    `

    const { uri } = await Print.printToFileAsync({ html })
    await Sharing.shareAsync(uri)
  }

  return { generatePDF }
}
