export interface Supplier {
  id: string;
  companyName: string;
  title: string;
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
}

export interface SupplierResponse {
  message: string;
  status: number;
  statusText: string;
  data: Supplier[];
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
}

export interface SupplierByIdResponse {
  message: string;
  status: number;
  statusText: string;
  data: Supplier;
}

export interface SupplierData {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
}
