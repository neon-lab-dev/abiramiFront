export interface Image {
  fileId: string;
  inventoryId: string;
  name: string;
  thumbnailUrl: string;
  url: string;
}

export interface InventoryItem {
  id?: string;
  refrence: string;
  buyingCost: number;
  quantity: number;
  description: string;
  sellingCost: number;
  warehouseLocation: string;
  quantityType: string;
  alarm: number;
  image: Image;
  createdAt?: string;
  updatedAt?: string;
  catgoryId: string;
}
export interface InventoryDownloadItem {
  refrence: string;
  quantity: number;
  description: string;
  warehouseLocation: string;
  catgory: string;
}

export interface InventoryResponse {
  message: string;
  status: number;
  statusText: string;
  data: InventoryItem;
}

export interface InventoryData {
  lowStock: number;
  outOfStock: number;
  totalQuantity: number;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  inventory: InventoryItem[];
}

export interface InventoryListResponse {
  message: string;
  status: number;
  statusText: string;
  data: Category[];
}