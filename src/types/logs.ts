export interface Log {
    id: string;
    txnType: 'BUY' | 'SELL';
    txnUnits: number;
    comments: string;
    createdAt: string;
    updatedAt: string;
    inventoryId: string;
}

export interface LogApiResponse {
    message: string;
    status: number;
    statusText: string;
    data: Log[];
}