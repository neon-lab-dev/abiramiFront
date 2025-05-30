import { Client } from "./client";

export interface ProductDetail {
  serialNo:number|null;
  id?: string;
  description: string;
  HSNno: string;
  quantity: number | null;
  rate: number | null;
  discount: number | null;
  amount: number | null;
}

export interface InvoiceRequest {
  clientName: string;
  date: string;
  state: string;
  code: number | null;
  billingStatus: string;
  invoiceType: string;
  taxType: string;
  subTotal: number | null;
  pfAmount: number | null;
  roundOff: number | null;
  totalAmount: number | null;
  taxGST: number | null;
  bankName: string;
  chequeNumber: string;
  chequeAmount: number | null;
  transport: string;
  placeOfSupply: string;
  poNO: string | null;
  vehicleNo: string;
  productDetails: ProductDetail[];
}

export interface InvoiceResponse {
  id: string;
  clientName: string;
  date: string;
  state: string;
  code: number | null;
  billingStatus: string;
  taxType: string;
  invoiceType: string;
  bankName: string;
  chequeNumber: string;
  chequeAmount: number | null;
  transport: string;
  placeOfSupply: string;
  poNO: string | null;
  vehicleNo: string | null;
  createdAt: string;
  updatedAt: string;
  totalAmount: number | null;
  taxGST: number | null;
  subTotal: number | null;
  pfAmount: number | null;
  roundOff: number | null;
  productDetails: ProductDetail[];
}

export interface InvoicesResponse {
  message: string;
  status: number | null;
  statusText: string;
  data: InvoiceResponse[];
  paidInvoices: number | null;
  pendingInvoices: number | null;
  draftInvoices?: number | null;
  totalInvoices?: number | null;
  totalIncome?: number | null;
}

export interface InvoiceData {
  invoiceId:string;
  id: string;
  clientName: string;
  date: string;
  state: string;
  code: number | null;
  billingStatus: string;
  taxType: string;
  invoiceType: string;
  bankName: string;
  chequeNumber: string;
  chequeAmount: number | null;
  transport: string | null;
  placeOfSupply: string | null;
  poNO: string | null;
  vehicleNo: string | null;
  createdAt: string;
  updatedAt: string;
  totalAmount: number | null;
  taxGST: number | null;
  subTotal: number | null;
  pfAmount: number | null;
  roundOff: number | null;
  productDetails: ProductDetail[];
  client: Client;
}

export interface InvoiceResponseWithClient {
  message: string;
  status: number | null;
  statusText: string;
  data: InvoiceData;
}


