export interface Invoice {
  id: string;
  clientName: string;
  date: string;
  state: string;
  code: number;
  billingStatus: string;
  taxType: string;
  invoiceType: string;
  bankName: string | null;
  chequeNumber: string | null;
  chequeAmount: number | null;
  transport: string | null;
  placeOfSupply: string | null;
  poNO: string | null;
  vehicleNo: string | null;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  taxGST: number;
  subTotal: number | null;
  pfAmount: number | null;
  roundOff: number | null;
}

export interface Client {
  id: string;
  companyName: string;
  contactPerson: string;
  GST: string;
  mobileNum: string;
  landLineNum: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  pincode: number;
  state: string;
  country: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  invoice?: Invoice[];
}

export interface ClientResponse {
  message: string;
  status: number;
  statusText: string;
  data: Client[];
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
}

export interface SingleClientResponse {
  message: string;
  status: number;
  statusText: string;
  data: Client;
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
}

export interface CreateClient {
  companyName: string;
  contactPerson: string;
  GST: string;
  mobileNum: string;
  landLineNum: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  pincode: number | null;
  state: string;
  country: string;
  status: string;
}
