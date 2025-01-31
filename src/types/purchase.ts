export interface Purchase {
  id: string;
  companyName: string;
  invoiceNumber: number;
  date: string;
  totalPurchaseAmt: number;
  gstNum: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseFormData {
  companyName: string;
  invoiceNumber: number | null;
  date: string;
  totalPurchaseAmt: number | null;
  gstNum: number | null;
  status: string;
}

export interface PurchaseResponse {
  message: string;
  status: number;
  statusText: string;
  data: Purchase[];
  totalClients: number;
  activeClients: number;
  inactiveClinets: number;
}

export interface PurchaseData {
  totalClients: number;
  activeClients: number;
  inactiveClinets: number;
}

export interface SinglePurchaseResponse {
  message: string;
  status: number;
  statusText: string;
  data: Purchase;
}
