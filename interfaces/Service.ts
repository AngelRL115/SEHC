import { ServiceInventoryItem } from './ServiceInventoryItem';

export interface Service {
    idService: number;
    Vehicle_idVehicle: number;
    User_idUser: number;
    service_status_idservice_status: number;
    service_type_idservice_type: number;
    priority_idpriority: number;
    diagnostic: string | null;
    gasLevel: string | null;
    km: string | null;
    serviceDetails: any; // Prisma's Json type can be represented as 'any' in TypeScript
    totalCost: string | null;
    serviceNotes: string | null;
    createdAt: Date;
    updatedAt: Date;
    inventoryItems: ServiceInventoryItem[];
}
