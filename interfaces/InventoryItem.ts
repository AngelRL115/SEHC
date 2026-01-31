export interface InventoryItem {
    id: number;
    name: string;
    description: string | null;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
