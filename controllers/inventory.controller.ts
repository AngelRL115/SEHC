import { Request, Response } from 'express';
import prisma from '../prisma/prisma';
import { StatusCodes } from 'http-status-codes';
import logger from '../logger/logger';
import { InventoryItem } from '../interfaces/InventoryItem';

export const getAllInventoryItems = async (req: Request, res: Response) => {
    try {
        const inventoryItems = await prisma.inventoryItem.findMany();
        logger.info('[GET] inventory.controller/getAllInventoryItems - Successfully retrieved all inventory items.');
        return res.status(StatusCodes.OK).json(inventoryItems);
    } catch (error) {
        logger.error(`[GET] inventory.controller/getAllInventoryItems - Error: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

export const getInventoryItemById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const inventoryItem = await prisma.inventoryItem.findUnique({
            where: { id: Number(id) },
        });
        if (!inventoryItem) {
            logger.warn(`[GET] inventory.controller/getInventoryItemById - Inventory item with id ${id} not found.`);
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Inventory item not found' });
        }
        logger.info(`[GET] inventory.controller/getInventoryItemById - Successfully retrieved inventory item with id ${id}.`);
        return res.status(StatusCodes.OK).json(inventoryItem);
    } catch (error) {
        logger.error(`[GET] inventory.controller/getInventoryItemById - Error: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

export const createInventoryItem = async (req: Request, res: Response) => {
    const { name, description, quantity, price } = req.body;

    if (!name || quantity === undefined || price === undefined) {
        logger.warn('[POST] inventory.controller/createInventoryItem - Missing required fields.');
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name, quantity, and price are required fields.' });
    }

    const newInventoryItem: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'> = {
        name,
        description,
        quantity,
        price,
    };

    try {
        const createdItem = await prisma.inventoryItem.create({
            data: newInventoryItem,
        });
        logger.info(`[POST] inventory.controller/createInventoryItem - Successfully created inventory item with name "${name}".`);
        return res.status(StatusCodes.CREATED).json(createdItem);
    } catch (error) {
        logger.error(`[POST] inventory.controller/createInventoryItem - Error: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, quantity, price } = req.body;

    try {
        const updatedItem = await prisma.inventoryItem.update({
            where: { id: Number(id) },
            data: {
                name,
                description,
                quantity,
                price,
            },
        });
        logger.info(`[PUT] inventory.controller/updateInventoryItem - Successfully updated inventory item with id ${id}.`);
        return res.status(StatusCodes.OK).json(updatedItem);
    } catch (error) {
        logger.error(`[PUT] inventory.controller/updateInventoryItem - Error: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

export const deleteInventoryItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.inventoryItem.delete({
            where: { id: Number(id) },
        });
        logger.info(`[DELETE] inventory.controller/deleteInventoryItem - Successfully deleted inventory item with id ${id}.`);
        return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        logger.error(`[DELETE] inventory.controller/deleteInventoryItem - Error: ${error}`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};
