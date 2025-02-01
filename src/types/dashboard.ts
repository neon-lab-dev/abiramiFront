export interface DashboardData {
    totalInvoices: number;
    paidInvoices: number;
    pendingInvoices: number;
    incomeReceivedFY: number;
    totalPurchaseReceivedFY: number;
    totalInvoicesThisMonth: number;
    salesThisMonth: number;
    purchaseThisMonth: number;
}

export interface DashboardApiResponse {
    message: string;
    status: number;
    statusText: string;
    data: DashboardData;
}