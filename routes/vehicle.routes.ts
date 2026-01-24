import { Router } from "express"
import * as vehicleController from "../controllers/vehicle.controller"


const vehicleRouter = Router()
const vehicleRoutes = (baseRouter: Router) =>{
    baseRouter.use('/vehicle', vehicleRouter)

    /**
     * @swagger
     * /vehicle/newVehicle:
     *   post:
     *     summary: Registra un nuevo vehículo
     *     tags: [Vehicle]
     *     produces: [application/json]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - idClient
     *               - brand
     *               - model
     *               - year
     *               - color
     *               - plate
     *               - doors
     *               - motor
     *             properties:
     *               idClient:
     *                 type: integer
     *                 example: 1
     *               brand:
     *                 type: string
     *                 example: Honda
     *               model:
     *                 type: string
     *                 example: Civic
     *               year:
     *                 type: integer
     *                 example: 2022
     *               color:
     *                 type: string
     *                 example: Rojo
     *               plate:
     *                 type: string
     *                 example: ABC-123
     *               doors:
     *                 type: integer
     *                 example: 4
     *               motor:
     *                 type: string
     *                 example: 2.0L
     *     responses:
     *       201:
     *         description: Vehículo registrado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: New vehicle registered
     *       400:
     *         description: Faltan campos requeridos
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: all fields are required
     *       409:
     *         description: Conflicto al guardar el vehículo
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: New vehicle cannot be saved
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
    vehicleRouter.post('/newVehicle', vehicleController.newVehicle)

    /**
     * @swagger
     * /vehicle/getVehicle/{idVehicle}:
     *   get:
     *     summary: Obtener un vehículo por su ID
     *     tags: [Vehicle]
     *     produces: [application/json]
     *     parameters:
     *       - in: path
     *         name: idVehicle
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID numérico del vehículo
     *     responses:
     *       200:
     *         description: Datos del vehículo obtenidos
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 idVehicle:
     *                   type: integer
     *                 cliente_idcliente:
     *                   type: integer
     *                 brand:
     *                   type: string
     *                 model:
     *                   type: string
     *                 year:
     *                   type: integer
     *                 color:
     *                   type: string
     *                 plate:
     *                   type: string
     *                 doors:
     *                   type: integer
     *                 motor:
     *                   type: string
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *       400:
     *         description: Falta el idVehicle
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: idVehicle field required
     *       404:
     *         description: Vehículo no encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: No vehicle found with id 10
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
    vehicleRouter.get('/getVehicle/:idVehicle', vehicleController.getVehicle)

    /**
     * @swagger
     * /vehicle/getAllVehicles:
     *   get:
     *     summary: Obtener todos los vehículos registrados
     *     tags: [Vehicle]
     *     produces: [application/json]
     *     responses:
     *       200:
     *         description: Lista de todos los vehículos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   idVehicle:
     *                     type: integer
     *                   cliente_idcliente:
     *                     type: integer
     *                   brand:
     *                     type: string
     *                   model:
     *                     type: string
     *                   year:
     *                     type: integer
     *                   color:
     *                     type: string
     *                   plate:
     *                     type: string
     *                   doors:
     *                     type: integer
     *                   motor:
     *                     type: string
     *                   createdAt:
     *                     type: string
     *                     format: date-time
     *                   updatedAt:
     *                     type: string
     *                     format: date-time
     *       404:
     *         description: No se encontraron vehículos
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: No vehicles found in the database
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
    vehicleRouter.get('/getAllVehicles', vehicleController.getAllVehicles)

    /**
     * @swagger
     * /vehicle/getAllVehiclesFromClient/{idClient}:
     *   get:
     *     summary: Obtener todos los vehículos de un cliente específico
     *     tags: [Vehicle]
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
     *         description: Lista de vehículos del cliente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   idVehicle:
     *                     type: integer
     *                   cliente_idcliente:
     *                     type: integer
     *                   brand:
     *                     type: string
     *                   model:
     *                     type: string
     *                   year:
     *                     type: integer
     *                   color:
     *                     type: string
     *                   plate:
     *                     type: string
     *                   doors:
     *                     type: integer
     *                   motor:
     *                     type: string
     *                   createdAt:
     *                     type: string
     *                     format: date-time
     *                   updatedAt:
     *                     type: string
     *                     format: date-time
     *       404:
     *         description: Cliente no encontrado o sin vehículos
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: Client with id 5 does not exist
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
    vehicleRouter.get('/getAllVehiclesFromClient/:idClient', vehicleController.getAllVehiclesFromClient)

    /**
     * @swagger
     * /vehicle/updateVehicle:
     *   patch:
     *     summary: Actualizar datos de un vehículo
     *     tags: [Vehicle]
     *     produces: [application/json]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - idVehicle
     *             properties:
     *               idVehicle:
     *                 type: integer
     *                 example: 10
     *               brand:
     *                 type: string
     *               model:
     *                 type: string
     *               year:
     *                 type: integer
     *               color:
     *                 type: string
     *               plate:
     *                 type: string
     *               doors:
     *                 type: integer
     *               motor:
     *                 type: string
     *     responses:
     *       200:
     *         description: Vehículo actualizado correctamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Vehicle updated successfully
     *                 vehicle:
     *                   type: object
     *                   properties:
     *                     idVehicle:
     *                       type: integer
     *                     cliente_idcliente:
     *                       type: integer
     *                     brand:
     *                       type: string
     *                     model:
     *                       type: string
     *                     year:
     *                       type: integer
     *                     color:
     *                       type: string
     *                     plate:
     *                       type: string
     *                     doors:
     *                       type: integer
     *                     motor:
     *                       type: string
     *                     updatedAt:
     *                       type: string
     *                       format: date-time
     *       400:
     *         description: Falta idVehicle
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: idVehicle field required
     *       404:
     *         description: Vehículo no encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: No vehicle found with id 10
     *       409:
     *         description: No se pudo actualizar el vehículo
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: Vehicle with id 10 cannot be updated
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
    vehicleRouter.patch('/updateVehicle/', vehicleController.updateVehicle)

    /**
     * @swagger
     * /vehicle/deleteVehicle/{idVehicle}:
     *   delete:
     *     summary: Eliminar un vehículo
     *     tags: [Vehicle]
     *     produces: [application/json]
     *     parameters:
     *       - in: path
     *         name: idVehicle
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID numérico del vehículo
     *     responses:
     *       200:
     *         description: Vehículo eliminado correctamente
     *       400:
     *         description: Falta idVehicle
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: idVehicle field required
     *       404:
     *         description: Vehículo no encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: No vehicle found with id 10
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
    vehicleRouter.delete('/deleteVehicle/:idVehicle', vehicleController.deleteVehicle)
}
export default vehicleRoutes