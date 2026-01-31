import { Request, Response } from 'express';
import prisma from '../prisma/prisma';
import { StatusCodes } from 'http-status-codes';
import logger from '../logger/logger';
import { Service } from '../interfaces/Service';

export const createService = async (req: Request, res: Response) => {
    const {
        Vehicle_idVehicle,
        User_idUser,
        service_status_idservice_status,
        service_type_idservice_type,
        priority_idpriority,
        diagnostic,
        gasLevel,
        km,
        serviceDetails,
        totalCost,
        serviceNotes,
        inventoryItems // Example: [{ inventoryItemId: 1, quantity: 2 }, { inventoryItemId: 3, quantity: 1 }]
    } = req.body;

    if (!Vehicle_idVehicle || !User_idUser || !service_status_idservice_status || !service_type_idservice_type || !priority_idpriority) {
        logger.warn('[POST] service.controller/createService - Missing required fields.');
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Vehicle_idVehicle, User_idUser, service_status_idservice_status, service_type_idservice_type, and priority_idpriority are required fields.' });
    }

    try {
        // Validate inventory stock before starting the transaction
        if (inventoryItems && inventoryItems.length > 0) {
            for (const item of inventoryItems) {
                const inventoryItem = await prisma.inventoryItem.findUnique({
                    where: { id: item.inventoryItemId },
                });

                if (!inventoryItem || inventoryItem.quantity < item.quantity) {
                    throw new Error('Not enough items in stock for one or more inventory items.');
                }
            }
        }

        const newService = await prisma.$transaction(async (prisma) => {
            const service = await prisma.service.create({
                data: {
                    Vehicle_idVehicle,
                    User_idUser,
                    service_status_idservice_status,
                    service_type_idservice_type,
                    priority_idpriority,
                    diagnostic,
                    gasLevel,
                    km,
                    serviceDetails,
                    totalCost,
                    serviceNotes,
                },
            });

            if (inventoryItems && inventoryItems.length > 0) {
                for (const item of inventoryItems) {
                    await prisma.serviceInventoryItem.create({
                        data: {
                            serviceId: service.idService,
                            inventoryItemId: item.inventoryItemId,
                            quantity: item.quantity,
                        },
                    });

                    await prisma.inventoryItem.update({
                        where: { id: item.inventoryItemId },
                        data: {
                            quantity: {
                                decrement: item.quantity,
                            },
                        },
                    });
                }
            }

            return service;
        });

        logger.info(`[POST] service.controller/createService - Successfully created a new service.`);
        return res.status(StatusCodes.CREATED).json(newService);
    } catch (error) {
        logger.error(`[POST] service.controller/createService - Error: ${error}`);
        if (error instanceof Error && error.message.includes('Not enough items in stock')) {
            return res.status(StatusCodes.CONFLICT).json({ error: 'Not enough items in stock for one or more inventory items.' });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};
