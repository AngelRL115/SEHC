import { Router } from 'express';
import * as serviceController from '../controllers/service.controller';

const serviceRouter = Router();

const serviceRoutes = (baseRouter: Router) => {
    baseRouter.use('/service', serviceRouter);

    /**
     * @swagger
     * /service:
     *   post:
     *     summary: Create a new service
     *     tags: [Service]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               Vehicle_idVehicle:
     *                 type: integer
     *               User_idUser:
     *                 type: integer
     *               service_status_idservice_status:
     *                 type: integer
     *               service_type_idservice_type:
     *                 type: integer
     *               priority_idpriority:
     *                 type: integer
     *               diagnostic:
     *                 type: string
     *               gasLevel:
     *                 type: string
     *               km:
     *                 type: string
     *               serviceDetails:
     *                 type: object
     *               totalCost:
     *                 type: string
     *               serviceNotes:
     *                 type: string
     *               inventoryItems:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     inventoryItemId:
     *                       type: integer
     *                     quantity:
     *                       type: integer
     *     responses:
     *       201:
     *         description: Created
     *       400:
     *         description: Bad request
     *       409:
     *         description: Conflict
     *       500:
     *         description: Internal server error
     */
    serviceRouter.post('/', serviceController.createService);
};

export default serviceRoutes;
