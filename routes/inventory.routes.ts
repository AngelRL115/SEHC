import { Router } from 'express';
import * as inventoryController from '../controllers/inventory.controller';

const inventoryRouter = Router();

const inventoryRoutes = (baseRouter: Router) => {
    baseRouter.use('/inventory', inventoryRouter);

    /**
     * @swagger
     * /inventory:
     *   get:
     *     summary: Retrieve a list of all inventory items
     *     tags: [Inventory]
     *     responses:
     *       200:
     *         description: A list of inventory items.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/InventoryItem'
     *       500:
     *         description: Internal server error
     */
    inventoryRouter.get('/', inventoryController.getAllInventoryItems);

    /**
     * @swagger
     * /inventory/{id}:
     *   get:
     *     summary: Retrieve a single inventory item by ID
     *     tags: [Inventory]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the inventory item to retrieve
     *     responses:
     *       200:
     *         description: A single inventory item.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InventoryItem'
     *       404:
     *         description: Inventory item not found
     *       500:
     *         description: Internal server error
     */
    inventoryRouter.get('/:id', inventoryController.getInventoryItemById);

    /**
     * @swagger
     * /inventory:
     *   post:
     *     summary: Create a new inventory item
     *     tags: [Inventory]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/InventoryItem'
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InventoryItem'
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    inventoryRouter.post('/', inventoryController.createInventoryItem);

    /**
     * @swagger
     * /inventory/{id}:
     *   put:
     *     summary: Update an existing inventory item
     *     tags: [Inventory]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the inventory item to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/InventoryItem'
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InventoryItem'
     *       404:
     *         description: Inventory item not found
     *       500:
     *         description: Internal server error
     */
    inventoryRouter.put('/:id', inventoryController.updateInventoryItem);

    /**
     * @swagger
     * /inventory/{id}:
     *   delete:
     *     summary: Delete an inventory item
     *     tags: [Inventory]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID of the inventory item to delete
     *     responses:
     *       204:
     *         description: No Content
     *       404:
     *         description: Inventory item not found
     *       500:
     *         description: Internal server error
     */
    inventoryRouter.delete('/:id', inventoryController.deleteInventoryItem);
};

export default inventoryRoutes;
