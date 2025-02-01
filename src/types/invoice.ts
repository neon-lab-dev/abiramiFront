export interface ProductDetailRequest {
  description: string;
  HSNno: number;
  quantity: number;
  rate: number;
  discount: number;
  amount: number;
}

export interface InvoiceRequest {
  clientName: string;
  date: string;
  GST: string;
  state: string;
  code: number;
  billingStatus: string;
  invoiceType: string;
  taxType: string;
  subTotal: number;
  pfAmount: number;
  taxIgst: number;
  roundOff: number;
  total: number;
  productDetails: ProductDetailRequest[];
}
