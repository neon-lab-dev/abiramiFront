export interface ClientData {
  id: string;
  companyName: string;
  contactPerson: string;
  GST?: string;
  mobileNum: string;
  landLineNum?: string;
  email: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  pincode?: number;
  state?: string;
  country?: string;
  status: string;
}
