// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// // Define styles
// const styles = StyleSheet.create({
//   page: { padding: 20, fontSize: 12 },
//   section: { marginBottom: 10 },
//   header: { fontSize: 18, textAlign: "center", marginBottom: 10 },
//   table: { width: "100%", marginBottom: 10, borderWidth: 1 },
//   tableRow: { flexDirection: "row", borderBottomWidth: 1 },
//   tableCell: { flex: 1, padding: 5, textAlign: "center" },
//   bold: { fontWeight: "bold" },
//   text: { paddingBottom: 10 },
// });

// // Invoice PDF Component
// export const InvoicePDF = ({ invoiceData }: { invoiceData: any }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* Invoice Title */}
//       <Text style={styles.header}>Invoice</Text>

//       {/* Invoice Details */}
//       <View style={styles.section}>
//         <Text style={styles.text}>Invoice ID: {invoiceData?.id}</Text>
//         <Text style={styles.text}>Client Name: {invoiceData?.clientName}</Text>
//         <Text style={styles.text}>Date: {invoiceData?.date}</Text>
//         <Text style={styles.text}>State: {invoiceData?.state}</Text>
//         <Text style={styles.text}>
//           Billing Status: {invoiceData?.billingStatus}
//         </Text>
//         <Text style={styles.text}>Tax Type: {invoiceData?.taxType}</Text>
//         <Text style={styles.text}>
//           Invoice Type: {invoiceData?.invoiceType}
//         </Text>
//         <Text style={styles.text}>Bank: {invoiceData?.bankName}</Text>
//         <Text style={styles.text}>Cheque No: {invoiceData?.chequeNumber}</Text>
//         <Text style={styles.text}>
//           Cheque Amount: ₹{invoiceData?.chequeAmount}
//         </Text>
//       </View>

//       {/* Product Table */}
//       <View style={styles.table}>
//         <View style={[styles.tableRow, styles.bold]}>
//           <Text style={styles.tableCell}>Description</Text>
//           <Text style={styles.tableCell}>HSN No</Text>
//           <Text style={styles.tableCell}>Qty</Text>
//           <Text style={styles.tableCell}>Rate</Text>
//           <Text style={styles.tableCell}>Amount</Text>
//           <Text style={styles.tableCell}>Discount</Text>
//         </View>

//         {invoiceData?.productDetails?.map((product: any, index: number) => (
//           <View key={index} style={styles.tableRow}>
//             <Text style={styles.tableCell}>{product.description}</Text>
//             <Text style={styles.tableCell}>{product.HSNno}</Text>
//             <Text style={styles.tableCell}>{product.quantity}</Text>
//             <Text style={styles.tableCell}>{product.rate}</Text>
//             <Text style={styles.tableCell}>₹{product.amount}</Text>
//             <Text style={styles.tableCell}>{product.discount * 100}%</Text>
//           </View>
//         ))}
//       </View>

//       {/* Totals */}
//       <View style={styles.section}>
//         <Text style={styles.text}>Subtotal: ₹{invoiceData?.subTotal}</Text>
//         <Text style={styles.text}>PF Amount: ₹{invoiceData?.pfAmount}</Text>
//         <Text style={styles.text}>GST Tax: ₹{invoiceData?.taxGST}</Text>
//         <Text style={styles.text}>Round Off: ₹{invoiceData?.roundOff}</Text>
//         <Text style={{ fontSize: 14, fontWeight: "bold" }}>
//           Total Amount: ₹{invoiceData?.totalAmount}
//         </Text>
//       </View>
//     </Page>
//   </Document>
// );
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { InvoiceData, ProductDetail } from "../types/invoice";

// Define styles
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10, padding: 10, border: "1 solid #ddd" },
  header: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  table: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    border: "1 solid #000",
  },
  tableRow: { flexDirection: "row", borderBottom: "1 solid #000" },
  tableCell: { flex: 1, padding: 5, textAlign: "center" },
  totalSection: { marginTop: 10, textAlign: "right" },
});

// Invoice Component
export const InvoicePDF = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <Text style={styles.header}>Invoice</Text>
        </View>

        {/* Sender & Receiver Details */}
        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.header}>From</Text>
            <Text>Abirami Enterprises</Text>
            <Text>1052, Bharatpur road, Coimbatore</Text>
            <Text>GST: 33ACVPC901G1ZS</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>To</Text>
            <Text>{invoiceData?.clientName}</Text>
            <Text>{invoiceData?.state}</Text>
          </View>
        </View>

        {/* Billing Details */}
        <View style={styles.section}>
          <Text style={styles.header}>Billing Details</Text>
          <Text>Invoice ID: {invoiceData?.id}</Text>
          <Text>Invoice Type: {invoiceData?.invoiceType}</Text>
          <Text>Tax Type: {invoiceData?.taxType}</Text>
          <Text>
            Created Date: {new Date(invoiceData?.date).toDateString()}
          </Text>
          <Text>
            State & Code: {invoiceData?.state} ({invoiceData?.code})
          </Text>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>S.No</Text>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>HSN No.</Text>
            <Text style={styles.tableCell}>Quantity</Text>
            <Text style={styles.tableCell}>Rate</Text>
            <Text style={styles.tableCell}>Discount</Text>
            <Text style={styles.tableCell}>Amount</Text>
          </View>
          {invoiceData?.productDetails?.map(
            (item: ProductDetail, index: number) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.tableCell}>{index + 1}</Text>
                <Text style={styles.tableCell}>{item?.description}</Text>
                <Text style={styles.tableCell}>{item?.HSNno}</Text>
                <Text style={styles.tableCell}>{item?.quantity}</Text>
                <Text style={styles.tableCell}>{item?.rate}</Text>
                <Text style={styles.tableCell}>{item?.discount}</Text>
                <Text style={styles.tableCell}>{item?.amount}</Text>
              </View>
            )
          )}
        </View>

        {/* Totals */}
        <View style={styles.totalSection}>
          <Text>Sub Total: ₹ {invoiceData?.subTotal}</Text>
          <Text>PF Amount: ₹ {invoiceData?.pfAmount}</Text>
          <Text>IGST | @ 18%: ₹ {invoiceData?.taxGST}</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Total: ₹ {invoiceData?.totalAmount}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
