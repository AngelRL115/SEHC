import { Router } from "express";
import * as clientController from '../controllers/client.controller'
import authenticate from "../middlewares/auth/authenticate";

const clientRouter = Router()
const clientRoutes = (baseRouter: Router) => {
    baseRouter.use('/client', clientRouter)
    clientRouter.use('', authenticate)

    /**
     * @swagger
     * /client/newClient:
     *  post:
     *      summary: Registra a un nuevo cliente
     *      tags: [Client]
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          name:
     *                              type: string
     *                              example: Juan
     *                              required: true
     *                          lastName:
     *                              type: string
     *                              example: escutia
     *                              requires: true
     *                          phone:
     *                              type: string
     *                              example: 6692708747
     *                              required: true
     *                          invoice:
     *                              type: boolean
     *                              example: true
     *                              required: true
     *                          socialReazon:
     *                              type: string
     *                              example: empresa S.A. de C.V.
     *                          zipCode:
     *                              type: string
     *                              example: 44300
     *                          fiscalRegimen:
     *                              type: string
     *                              example: Sueldos y salarios e ingresos asimilados a salario
     *                          email:
     *                              type: string
     *                              example: juan.escutia@gmail.com
     *      responses:
     *          201:
     *              description: cliente creado exitosamente
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              message:
     *                                  type: string
     *                                  example: Client Registered successfully
     *          400:
     *              description: Error tratando de registrar al nuevo cliente
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              error:
     *                                  type: string
     *                                  example: name, lastName, phone and invoice fields are required
     *          500:
     *              description: Error interno del servidor
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              error:
     *                                  type: string
     *                                  example: Internal server error
     */
    clientRouter.post('/newClient', clientController.newClient)
}