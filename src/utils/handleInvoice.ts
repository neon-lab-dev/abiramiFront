/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { InvoiceData } from "../types/invoice";
import { formatNumber } from ".";

export const generateInvoicePDF = (invoiceData: InvoiceData) => {
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice", 105, 15, { align: "center" });

  // Sender & Receiver Details
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("From:", 10, 30);
  doc.text("Abirami Enterprises", 10, 35);
  doc.text("1052, Bharatpur road, Coimbatore", 10, 40);
  doc.text("GST: 33ACVPC901G1ZS", 10, 45);

  doc.text("To:", 140, 30);
  doc.text(invoiceData?.clientName, 140, 35);
  doc.text(invoiceData?.state, 140, 40);

  // Billing Details
  doc.text("Billing Details:", 10, 55);
  doc.text(`Invoice ID: ${invoiceData?.id}`, 10, 60);
  doc.text(`Invoice Type: ${invoiceData?.invoiceType}`, 10, 65);
  doc.text(`Tax Type: ${invoiceData?.taxType}`, 10, 70);
  doc.text(
    `Created Date: ${new Date(invoiceData?.date).toDateString()}`,
    10,
    75
  );
  doc.text(
    `State & Code: ${invoiceData?.state} (${invoiceData?.code})`,
    10,
    80
  );

  // Items Table
  const tableColumn = [
    "S.No",
    "Description",
    "HSN No.",
    "Quantity",
    "Rate",
    "Discount",
    "Amount",
  ];
  const tableRows = invoiceData?.productDetails?.map((item, index) => [
    index + 1,
    item?.description,
    item?.HSNno,
    item?.quantity,
    item?.rate,
    item?.discount,
    item?.amount,
  ]);

  autoTable(doc, {
    startY: 90,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 2 },
  });

  // Totals
  const finalY = (doc as any).autoTable.previous.finalY + 10;
  doc.text(
    `Sub Total: INR ${formatNumber(invoiceData?.subTotal ?? 0)}`,
    140,
    finalY
  );
  doc.text(
    `PF Amount: INR ${formatNumber(invoiceData?.pfAmount ?? 0)}`,
    140,
    finalY + 5
  );
  doc.text(
    `IGST | @ 18%: INR ${formatNumber(invoiceData?.taxGST ?? 0)}`,
    140,
    finalY + 10
  );
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(
    `Total: INR ${formatNumber(invoiceData?.totalAmount ?? 0)}`,
    140,
    finalY + 20
  );

  // Save the PDF
  doc.save("invoice.pdf");
};

// export default generateInvoicePDF;
