import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { InvoiceData, ProductDetail } from "../types/invoice";

// Define styles
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: { fontSize: 20, fontWeight: "bold" },
  sample: { fontSize: 12, color: "red", fontWeight: "bold" },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  section: { marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  table: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    border: "1 solid #000",
  },
  tableRow: { flexDirection: "row", borderBottom: "1 solid #000" },
  tableCell: { flex: 1, padding: 5, textAlign: "center" },
  totalSection: { marginTop: 10, textAlign: "right" },
  terms: { marginTop: 20, fontSize: 10 },
});

// Invoice Component
export const InvoicePDF = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Abhirami</Text>
          {/* <Text style={styles.sample}></Text>
          <Text>Commercial Invoice</Text> */}
        </View>

        {/* Invoice Metadata */}
        <View style={styles.row}>
          <View>
            <Text>Invoice Number: {invoiceData?.id}</Text>
            <Text>Invoice Date: {new Date(invoiceData?.date).toDateString()}</Text>
            <Text>Invoice Type: {invoiceData?.invoiceType}</Text>
            <Text>Tax Type : {invoiceData?.taxType}</Text>
          </View>
          <View>
            <Text>State & Code: {invoiceData?.state }{invoiceData?.code}</Text>
          
          </View>
        </View>

        {/* Sender & Receiver Details */}
        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.title}>From</Text>
            <Text>Stark Industries Ltd.</Text>
            <Text>1147 Rohan Drive Suite 819 - Burlington, VT / 80201</Text>
            <Text>Phone: 904-966-2836</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>To</Text>
            <Text>MetalTech</Text>
            <Text>5678 Industrial Way, Metropolis, NY 10001</Text>
            <Text>Phone: 985-282-2836</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Item</Text>
            <Text style={styles.tableCell}>Qty</Text>
            <Text style={styles.tableCell}>HS Code</Text>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {invoiceData?.productDetails?.map(
            (item: ProductDetail, index: number) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.tableCell}>{item?.description}</Text>
                <Text style={styles.tableCell}>{item?.quantity}</Text>
                <Text style={styles.tableCell}>{item?.HSNno}</Text>
                <Text style={styles.tableCell}>{item?.description}</Text>
                <Text style={styles.tableCell}>₹ {item?.amount}</Text>
              </View>
            )
          )}
        </View>

        {/* Totals */}
        <View style={styles.totalSection}>
          <Text>Subtotal: ₹ {invoiceData?.subTotal}</Text>
          <Text>
  {invoiceData?.taxType === "IGST"
    ? `IGST | @ 18%: ₹ ${invoiceData?.taxGST || 0}`
    : `CGST | @ 9% & SGST | @ 9%: ₹ ${invoiceData?.taxGST || 0}`}
</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Total Amount: ₹ {invoiceData?.totalAmount}
          </Text>
        </View>

        {/* Payment Terms
        <View style={styles.section}>
          <Text style={styles.title}>Payment Terms</Text>
          <Text>Payment Transferable to:</Text>
          <Text>Stark Industries</Text>
          <Text>Account Number: 49124104981</Text>
          <Text>Bank Name: ABC Bank</Text>
          <Text>SWIFT Code: SWIFT000</Text>
        </View> */}

        {/* Terms and Conditions
        <View style={styles.terms}>
          <Text>Terms and Conditions:</Text>
          <Text>• Please send your payment to Stark Industries via Bank Transfer.</Text>
          <Text>• This deposit is non-refundable as per our deposit agreement attached.</Text>
        </View> */}
      </Page>
    </Document>
  );
};

export default InvoicePDF;
