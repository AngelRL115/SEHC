import { InventoryItem } from './InventoryItem';
import { Service } from './Service';

export interface ServiceInventoryItem {
    id: number;
    service: Service;
    serviceId: number;
    inventoryItem: InventoryItem;
    inventoryItemId: number;
    quantity: number;
}
