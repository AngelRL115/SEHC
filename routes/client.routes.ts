import { Router } from 'express'
import * as clientController from '../controllers/client.controller'
import { cli } from 'winston/lib/winston/config'


const clientRouter = Router()
const clientRoutes = (baseRouter: Router) => {
	baseRouter.use('/client', clientRouter)

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
	 *                          socialReason:
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

	/**
	 * @swagger
	 * /client/updateClientInvoiceDetails:
	 *  put:
	 *      summary: Actualiza la informacion de facturacion de un cliente
	 *      tags: [Client]
	 *      requestBody:
	 *          required: true
	 *          content:
	 *              application/json:
	 *                  schema:
	 *                      type: object
	 *                      properties:
	 *                          idClient:
	 *                              type: number
	 *                              example: 23
	 *                              required: true
	 *                          invoice:
	 *                              type: boolean
	 *                              example: true
	 *                              required: true
	 *                          socialReason:
	 *                              type: string
	 *                              example: empresa S.A. de C.V.
	 *                              required: true
	 *                          zipcode:
	 *                              type: string
	 *                              example: 44300
	 *                              required: true
	 *                          fiscalRegimen:
	 *                              type: string
	 *                              example: Sueldos y salarios e ingresos asimilados a salario
	 *                              required: true
	 *                          email:
	 *                              type: string
	 *                              example: juan.escutia@gmail.com
	 *      responses:
	 *          200:
	 *              description: Datos Actualizados correctamente
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              message:
	 *                                  type: string
	 *                                  example: Data updated, now client has details for invoices
	 *          404:
	 *              description: Usuario no encontrado para la actualizacion
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              error:
	 *                                  type: string
	 *                                  example: No client found with ID ${idClient}. Update cannot be performed
	 *          500:
	 *              description: Error interno del servidor
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              error:
	 *                                  type: string
	 *                                  example: (PUT) Internal server error ${error.message}
	 */
	clientRouter.patch('/updateClientInvoiceDetails', clientController.updateClientInvoiceDetails)

	/**
	 * @swagger
	 * /client/updateClientDetails:
	 *  put:
	 *      summary: Actualiza la informacion basica de un cliente
	 *      tags: [Client]
	 *      requestBody:
	 *          required: true
	 *          content:
	 *              application/json:
	 *                  schema:
	 *                      type: object
	 *                      properties:
	 *                          idClient:
	 *                              type: string
	 *                              example: 2
	 *                              required: true
	 *                          name:
	 *                              type: string
	 *                              example: Ramon
	 *                              required: true
	 *                          lastName:
	 *                              type: string
	 *                              example: Corona
	 *                              required: true
	 *                          phone:
	 *                              type: string
	 *                              example: 6598423158
	 *                              required: true
	 *      responses:
	 *          200:
	 *              description: Actualizacion de los datos exitosa
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              message:
	 *                                  type: string
	 *                                  example: Basic personal information updated
	 *          409:
	 *              description: Actualizacion de los datos fallida
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              error:
	 *                                  type: string
	 *                                  example: Update cannot be performe. see log details ${updatedDetails}
	 *          500:
	 *              description: Error interno del servidor
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              error:
	 *                                  type: string
	 *                                  example: (PUT) clientController/updateClientDetails error ${error.message}
	 */
	clientRouter.patch('/updateClientDetails', clientController.updateClientDetails)

	/**
	 * @swagger
	 * /client/getClientDetails:
	 *   get:
	 *     summary: Obtener todos los detalles de un cliente en específico
	 *     tags: [Client]
	 *     parameters:
	 *       - name: idClient
	 *         in: query
	 *         description: Id del cliente del que se consultará la información
	 *         required: true
	 *         schema:
	 *           type: number
	 *     responses:
	 *       200:
	 *         description: Datos obtenidos de manera correcta
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 name:
	 *                   type: string
	 *                   example: Juan
	 *                 lastName:
	 *                   type: string
	 *                   example: Escutia
	 *                 phone:
	 *                   type: string
	 *                   example: 6692708747
	 *                 invoice:
	 *                   type: boolean
	 *                   example: true
	 *                 socialReason:
	 *                   type: string
	 *                   example: empresa S.A. de C.V.
	 *                 zipcode:
	 *                   type: string
	 *                   example: 44300
	 *                 fiscalRegimen:
	 *                   type: string
	 *                   example: Sueldos y salarios e ingresos asimilados a salario
	 *                 email:
	 *                   type: string
	 *                   example: juan.escutia@gmail.com
	 *       404:
	 *         description: Cliente no encontrado
	 *         content:
	 *              application/json:
	 *                  schema:
	 *                      type: object
	 *                      properties:
	 *                          error:
	 *                              type: string
	 *                              example: No client found with ID ${idClient}
	 *       500:
	 *         description: Error interno del servidor
	 *         content:
	 *              application/json:
	 *                  schema:
	 *                      type: object
	 *                      properties:
	 *                          error:
	 *                              type: string
	 *                              example: (GET) clientController/getClientDetails. Internal server error ${error.message}
	 */

	clientRouter.get('/getClientDetails', clientController.getClientDetails)

	/**
	 * @swagger
	 * /client/getAllClients:
	 *   get:
	 *     summary: Obtener los detalles de todos los clientes
	 *     tags: [Client]
	 *     responses:
	 *       200:
	 *         description: Datos obtenidos de manera correcta
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 type: object
	 *                 properties:
	 *                   name:
	 *                     type: string
	 *                     example: Juan
	 *                   lastName:
	 *                     type: string
	 *                     example: Escutia
	 *                   phone:
	 *                     type: string
	 *                     example: 6692708747
	 *                   invoice:
	 *                     type: boolean
	 *                     example: true
	 *                   socialReason:
	 *                     type: string
	 *                     example: Empresa S.A. de C.V.
	 *                   zipcode:
	 *                     type: string
	 *                     example: 44300
	 *                   fiscalRegimen:
	 *                     type: string
	 *                     example: Sueldos y salarios e ingresos asimilados a salario
	 *                   email:
	 *                     type: string
	 *                     example: juan.escutia@gmail.com
	 *               example:
	 *                 - name: Juan
	 *                   lastName: Escutia
	 *                   phone: 6692708747
	 *                   invoice: true
	 *                   socialReason: Empresa S.A. de C.V.
	 *                   zipcode: 44300
	 *                   fiscalRegimen: Sueldos y salarios e ingresos asimilados a salario
	 *                   email: juan.escutia@gmail.com
	 *                 - name: Miguel
	 *                   lastName: Hidalgo
	 *                   phone: 1234567890
	 *                   invoice: false
	 *                   socialReason: null
	 *                   zipcode: null
	 *                   fiscalRegimen: null
	 *                   email: null
	 *       404:
	 *         description: Clientes no encontrados
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: No clients found, check error logs ${allClients}
	 *       500:
	 *         description: Error interno del servidor
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: (GET) clientController/getAllClients. Internal server error ${error}
	 */

	clientRouter.get('/getAllClients', clientController.getAllClients)

	clientRouter.post('/deleteClient', clientController.deleteClient)
}

export default clientRoutes
