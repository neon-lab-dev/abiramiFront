/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { InvoiceData } from "../types/invoice";
import { formatNumber } from ".";

export const generateInvoicePDF = (invoiceData: InvoiceData) => {
  const doc = new jsPDF();

  // // Add watermark logo
  // const img = new Image();
  // img.src = "src/assets/icons/fevIcon.png"; // Ensure the correct path
  // doc.addImage(img, "PNG", 50, 100, 100, 100, "watermark", "FAST");

  // Add header
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice", 105, 15, { align: "center" });

  // Sender & Receiver Details Table
  autoTable(doc, {
    startY: 25,
    head: [["From", "To"]],
    body: [ 
      [
        "Abirami Enterprises\n1052, Bharatpur road, Coimbatore\nGST: 33ACVPC901G1ZS",
        `${invoiceData?.clientName}\n${invoiceData?.state}`,
      ],
    ],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 2 },
    headStyles: { fillColor: [255,235,235], textColor: 0, fontStyle: "bold" },
  });

  // Billing Details Table
  autoTable(doc, {
    startY: (doc as any).autoTable.previous.finalY + 0,
    head: [["Invoice ID", "Invoice Type", "Tax Type", "Created Date", "State & Code"]],
    body: [
      [
        invoiceData?.id,
        invoiceData?.invoiceType,
        invoiceData?.taxType,
        new Date(invoiceData?.date).toDateString(),
        `${invoiceData?.state} (${invoiceData?.code})`,
      ],
    ],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 2 },
    headStyles: { fillColor: [255,235,235], textColor: 0, fontStyle: "bold" },
  });

  // Items Table
  autoTable(doc, {
    startY:(doc as any).autoTable.previous.finalY + 0,
    head: [["S.No", "Description", "HSN No.", "Quantity", "Rate", "Discount", "Amount"]],
    body: invoiceData?.productDetails?.map((item, index) => [
      index + 1,
      item?.description,
      item?.HSNno,
      item?.quantity,
      item?.rate,
      item?.discount,
      item?.amount,
    ]),
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 2 },
    headStyles: { fillColor: [255,235,235], textColor: 0, fontStyle: "bold" },
  });

  // Totals Table
  autoTable(doc, {
    startY: (doc as any).autoTable.previous.finalY + 0,
    head: [["Description", "Amount (INR)"]],
    body: [
      ["Sub Total", formatNumber(invoiceData?.subTotal ?? 0)],
      ["PF Amount", formatNumber(invoiceData?.pfAmount ?? 0)],
      [
        invoiceData?.taxType === "IGST" ? "IGST @ 18%" : "CGST @ 9% & SGST @ 9%",
        formatNumber(invoiceData?.taxGST ?? 0),
      ],
      ["Total", formatNumber(invoiceData?.totalAmount ?? 0)],
    ],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 2 },
    headStyles: { fillColor: [255,235,235], textColor: 0, fontStyle: "bold" },
  });
  autoTable(doc, {
    startY: (doc as any).autoTable.previous.finalY + 0,
    head: [["Bank Name", "Account Number", "IFSC", "Branch"]],
    body: [
      [
        "State Bank of India",
        "xxxx 98",
        "SBIN0098763",
        "Avinashi Road, Coimbatore-37",
      ],
    ],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 1 },
    headStyles: { fillColor: [255,235,235], textColor: 0, fontStyle: "bold" },
  });

 

  // Save the PDF
  doc.save("invoice.pdf");
};