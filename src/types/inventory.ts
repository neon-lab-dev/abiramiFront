export interface Image {
  fileId: string;
  inventoryId: string;
  name: string;
  thumbnailUrl: string;
  url: string;
}

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
  image: Image;
  createdAt: string;
  updatedAt: string;
  catgoryId: string;
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
