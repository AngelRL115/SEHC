import { Router } from 'express'
import * as clientController from '../controllers/client.controller'

const clientRouter = Router()
const clientRoutes = (baseRouter: Router) => {
	baseRouter.use('/client', clientRouter)

	/**
	 * @swagger
	 * /client/newClient:
	 *   post:
	 *     summary: Registra a un nuevo cliente
	 *     tags: [Client]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - name
	 *               - lastName
	 *               - phone
	 *               - invoice
	 *             properties:
	 *               name:
	 *                 type: string
	 *                 example: Juan
	 *               lastName:
	 *                 type: string
	 *                 example: Escutia
	 *               phone:
	 *                 type: string
	 *                 example: 6692708747
	 *               invoice:
	 *                 type: boolean
	 *                 description: Indica si el cliente requiere factura
	 *                 example: true
	 *               socialReason:
	 *                 type: string
	 *                 description: Requerido si invoice es true
	 *                 example: Empresa S.A. de C.V.
	 *               zipcode:
	 *                 type: string
	 *                 description: Requerido si invoice es true
	 *                 example: 44300
	 *               fiscalRegimen:
	 *                 type: string
	 *                 description: Requerido si invoice es true
	 *                 example: 601
	 *               email:
	 *                 type: string
	 *                 description: Requerido si invoice es true
	 *                 example: juan.escutia@gmail.com
	 *     responses:
	 *       201:
	 *         description: Cliente creado exitosamente
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: Client Registered successfully
	 *                 clientId:
	 *                   type: integer
	 *                   example: 1
	 *       400:
	 *         description: Faltan campos requeridos
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: name, lastName, phone and invoice (true or false) fields are required.
	 *       500:
	 *         description: Error interno del servidor
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Internal server error
	 */
	clientRouter.post('/newClient', clientController.newClient)

	/**
	 * @swagger
	 * /client/updateClientInvoiceDetails:
	 *   patch:
	 *     summary: Actualiza la información de facturación de un cliente
	 *     tags: [Client]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - idClient
	 *               - invoice
	 *             properties:
	 *               idClient:
	 *                 type: number
	 *                 example: 23
	 *               invoice:
	 *                 type: boolean
	 *                 example: true
	 *               socialReason:
	 *                 type: string
	 *                 example: Empresa S.A. de C.V.
	 *               zipcode:
	 *                 type: string
	 *                 example: 44300
	 *               fiscalRegimen:
	 *                 type: string
	 *                 example: 601
	 *               email:
	 *                 type: string
	 *                 example: juan.escutia@gmail.com
	 *     responses:
	 *       200:
	 *         description: Datos actualizados correctamente
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: Data updated, now client has details for invoices
	 *       404:
	 *         description: Cliente no encontrado
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: No client found with ID 23. Update cannot be performed
	 *       500:
	 *         description: Error interno del servidor
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Internal server error
	 */
	clientRouter.patch('/updateClientInvoiceDetails', clientController.updateClientInvoiceDetails)

	/**
	 * @swagger
	 * /client/updateClientDetails:
	 *   patch:
	 *     summary: Actualiza la información básica personal de un cliente
	 *     tags: [Client]
	 *     produces: [application/json]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - idClient
	 *             properties:
	 *               idClient:
	 *                 type: number
	 *                 example: 12
	 *               name:
	 *                 type: string
	 *                 example: María
	 *               lastName:
	 *                 type: string
	 *                 example: López
	 *               phone:
	 *                 type: string
	 *                 example: 5512345678
	 *               invoice:
	 *                 type: boolean
	 *                 description: Si se envía false, se limpian los datos fiscales
	 *                 example: false
	 *     responses:
	 *       200:
	 *         description: Actualización exitosa
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: Client information updated
	 *                 client:
	 *                   type: object
	 *                   properties:
	 *                     idclient:
	 *                       type: integer
	 *                     name:
	 *                       type: string
	 *                     lastName:
	 *                       type: string
	 *                     phone:
	 *                       type: string
	 *                     invoice:
	 *                       type: boolean
	 *                     socialReason:
	 *                       type: string
	 *                     zipcode:
	 *                       type: string
	 *                     fiscalRegimen:
	 *                       type: string
	 *                     email:
	 *                       type: string
	 *                     createdAt:
	 *                       type: string
	 *                       format: date-time
	 *                     updatedAt:
	 *                       type: string
	 *                       format: date-time
	 *       400:
	 *         description: Faltan datos (idClient)
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: idClient is required
	 *       404:
	 *         description: Cliente no encontrado
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: No client found with ID 12
	 *       500:
	 *         description: Error interno del servidor
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Internal server error
	 */
	clientRouter.patch('/updateClientDetails', clientController.updateClientDetails)

	/**
	 * @swagger
	 * /client/getClientDetails/{idClient}:
	 *   get:
	 *     summary: Obtener detalles de un cliente específico
	 *     tags: [Client]
	 *     produces: [application/json]
	 *     parameters:
	 *       - in: path
	 *         name: idClient
	 *         schema:
	 *           type: integer
	 *         required: true
	 *         description: ID numérico del cliente
	 *     responses:
	 *       200:
	 *         description: Datos del cliente obtenidos
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 idclient:
	 *                   type: integer
	 *                 name:
	 *                   type: string
	 *                 lastName:
	 *                   type: string
	 *                 phone:
	 *                   type: string
	 *                 invoice:
	 *                   type: boolean
	 *                 socialReason:
	 *                   type: string
	 *                 zipcode:
	 *                   type: string
	 *                 fiscalRegimen:
	 *                   type: string
	 *                 email:
	 *                   type: string
	 *                 createdAt:
	 *                   type: string
	 *                   format: date-time
	 *                 updatedAt:
	 *                   type: string
	 *                   format: date-time
	 *       404:
	 *         description: Cliente no encontrado
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Client not found with ID 7
	 *       500:
	 *         description: Error interno del servidor
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Internal server error
	 */
	clientRouter.get('/getClientDetails/:idClient', clientController.getClientDetails)

	/**
	 * @swagger
	 * /client/getAllClients:
	 *   get:
	 *     summary: Obtener la lista de todos los clientes
	 *     tags: [Client]
	 *     produces: [application/json]
	 *     responses:
	 *       200:
	 *         description: Lista de clientes obtenida correctamente
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 type: object
	 *                 properties:
	 *                   idclient:
	 *                     type: integer
	 *                   name:
	 *                     type: string
	 *                   lastName:
	 *                     type: string
	 *                   phone:
	 *                     type: string
	 *                   invoice:
	 *                     type: boolean
	 *                   socialReason:
	 *                     type: string
	 *                   zipcode:
	 *                     type: string
	 *                   fiscalRegimen:
	 *                     type: string
	 *                   email:
	 *                     type: string
	 *                   createdAt:
	 *                     type: string
	 *                     format: date-time
	 *                   updatedAt:
	 *                     type: string
	 *                     format: date-time
	 *       404:
	 *         description: No se encontraron clientes en la base de datos
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: No clients found
	 *       500:
	 *         description: Error interno del servidor
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Internal server error
	 */
	clientRouter.get('/getAllClients', clientController.getAllClients)

	/**
	 * @swagger
	 * /client/deleteClient/{idClient}:
	 *   delete:
	 *     summary: Eliminar un cliente y sus vehículos asociados
	 *     tags: [Client]
	 *     produces: [application/json]
	 *     parameters:
	 *       - in: path
	 *         name: idClient
	 *         schema:
	 *           type: integer
	 *         required: true
	 *         description: ID numérico del cliente
	 *     responses:
	 *       200:
	 *         description: Cliente eliminado exitosamente
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: Client with ID 5 deleted successfully. Also deleted 2 vehicles associated with client ID 5
	 *       404:
	 *         description: Cliente no encontrado
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Client not found with ID 5
	 *       500:
	 *         description: Error interno del servidor
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Internal server error
	 */
	clientRouter.delete('/deleteClient/:idClient', clientController.deleteClient)
}

export default clientRoutes
