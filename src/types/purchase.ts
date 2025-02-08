export interface Purchase {
  id: string;
  companyName: string;
  invoiceNumber: number;
  date: string;
  totalPurchaseAmt: number;
  gstNum: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseFormData {
  companyName: string;
  invoiceNumber: number | null;
  date: string;
  totalPurchaseAmt: number | null;
  gstNum: string;
  status: string;
}

export interface PurchaseResponse {
  message: string;
  status: number;
  statusText: string;
  data: Purchase[];
  totalPurchases: number;
  activePurchases: number;
  inactiveClinets: number;
}

export interface PurchaseData {
  totalPurchases: number;
  activePurchases: number;
  inactiveClinets: number;
}

export interface SinglePurchaseResponse {
  message: string;
  status: number;
  statusText: string;
  data: Purchase;
}
