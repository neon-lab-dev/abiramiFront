export interface InventoryItem {
    id: string;
    refrence: string;
    buyingCost: number;
    quantity: number;
    description: string;
    sellingCost: number;
    warehouseLocation: string;
    quantityType: string;
    alarm: number;
    createdAt: string;
    updatedAt: string;
    catgoryId: string;
}

export interface Category {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    inventory: InventoryItem[];
}

export interface CategoryResponse {
    message: string;
    status: number;
    statusText: string;
    data: Category[];
}