import { Request, response, Response } from 'express'
import prisma from '../prisma/prisma'
import { StatusCodes } from 'http-status-codes'
import * as dotenv from 'dotenv'
import { Vehicle } from '../interfaces/Vehicle'
import logger from '../logger/logger'
dotenv.config()



/**
 * Registers a new vehicle in the database based on the request body fields.
 *
 * @function newVehicle
 * @async
 *
 * @param {Request} req - Express request object. The body debe incluir:
 * 
 * - `idClient` (number) - ID del cliente al que pertenece el vehículo (requerido)
 * - `brand` (string) - Marca del vehículo (requerido)
 * - `model` (string) - Modelo del vehículo (requerido)
 * - `year` (number) - Año del vehículo (requerido)
 * - `color` (string) - Color del vehículo (requerido)
 * - `plate` (string) - Matrícula del vehículo (requerido)
 * - `doors` (number) - Número de puertas (requerido)
 * - `motor` (string) - Tipo o descripción del motor (requerido)
 *
 * @param {Response} res - Express response object. Usado para devolver una respuesta al cliente basada en el resultado de la operación.
 *
 * @returns {Promise<Response>} - Retorna una de las siguientes respuestas HTTP:
 * 
 * - `201 Created`: Vehículo creado exitosamente.
 * - `400 Bad Request`: Faltan campos requeridos en el cuerpo del request.
 * - `409 Conflict`: No se pudo guardar el vehículo.
 * - `500 Internal Server Error`: Error inesperado durante la operación.
 *
 * @example
 *  Request body:
 * {
 *   "idClient": 5,
 *   "brand": "Toyota",
 *   "model": "Corolla",
 *   "year": 2021,
 *   "color": "Blanco",
 *   "plate": "ABC123",
 *   "doors": 4,
 *   "motor": "1.8L"
 * }
 *
 *  Success response:
 * {
 *   "message": "New vehicle registered"
 * }
 *
 *  Error response (missing fields):
 * {
 *   "error": "all fields are required, please check them out on payload object or consult the swagger documentation"
 * }
 */
export const newVehicle = async (req: Request, res: Response) => {
	const { idClient, brand, model, year, color, plate, doors, motor } = req.body
	let responseStatus = StatusCodes.CREATED
	let responseContents

	try {
		if (!idClient) {
			responseStatus = StatusCodes.BAD_REQUEST
			responseContents = { error: 'idClient is a required field, please ensure that you are passing it' }
			logger.warn(`[POST] vehicle.controller/newVehicle. Missing idClient field.`)
			return res.status(responseStatus).send(responseContents)
		}
		if (!brand || !model || !year || !color || !plate || !doors || !motor) {
			responseStatus = StatusCodes.BAD_REQUEST
			responseContents = { error: 'all fields are required, please check them out on payload object or consult the swagger documentation' }
			logger.warn(`[POST] vehicle.controller/newVehicle. Missing required fields.`)
			return res.status(responseStatus).send(responseContents)
		}

		const Vehicle: Vehicle = {
			cliente_idcliente: idClient,
			brand,
			model,
			year,
			color,
			plate,
			doors,
			motor,
		}

		const createdVehicle = await prisma.vehicle.create({
			data: {
				cliente_idcliente: Vehicle.cliente_idcliente,
				brand: Vehicle.brand,
				model: Vehicle.model,
				year: Vehicle.year,
				color: Vehicle.color,
				plate: Vehicle.plate,
				doors: Vehicle.doors,
				motor: Vehicle.motor,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		})

		if (!createdVehicle) {
			responseStatus = StatusCodes.CONFLICT
			responseContents = { error: `New vehicle cannot be saved, check logs`, details: `${createdVehicle}` }
			logger.error(`[POST] vehicle.controller/newVehicle. New vehicle cannot be saved, check logs: ${createdVehicle}`)
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = { message: 'New vehicle registered' }
	} catch (error) {
		logger.error(`[POST] vehicle.controller/newVehicle .Internal server error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[POST] vehicle.controller/newVehicle. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

/**
 * Retrieves a single vehicle from the database using its unique identifier (`idVehicle`).
 *
 * @function getVehicle
 * @async
 *
 * @param {Request} req - Express request object. Se espera que el campo `idVehicle` esté presente en el cuerpo (`req.body`) del request.
 * 
 * @param {Response} res - Express response object. Utilizado para retornar la respuesta HTTP con los detalles del vehículo o un mensaje de error.
 *
 * @returns {Promise<Response>} - Devuelve una respuesta HTTP basada en el resultado de la consulta:
 *
 * - `200 OK`: Retorna los detalles del vehículo.
 * - `400 Bad Request`: Si el campo `idVehicle` no fue proporcionado.
 * - `404 Not Found`: Si no se encuentra ningún vehículo con el `idVehicle` proporcionado.
 * - `500 Internal Server Error`: Si ocurre un error inesperado durante la operación.
 *
 * @example
 *  Request body:
 * {
 *   "idVehicle": 42
 * }
 *
 *  Success response:
 * {
 *   "idVehicle": 42,
 *   "brand": "Mazda",
 *   "model": "CX-5",
 *   "year": 2022,
 *   "color": "Rojo",
 *   "plate": "ABC123",
 *   ...
 * }
 *
 *  Error response (missing id):
 * {
 *   "error": "idVehicle field required"
 * }
 */
export const getVehicle = async (req: Request, res: Response) => {
	const { idVehicle } = req.body
	let responseStatus = StatusCodes.OK
	let responseContents

	try {
		if (!idVehicle) {
			responseStatus = StatusCodes.BAD_REQUEST
			responseContents = { error: 'idVehicle field required' }
			logger.warn(`[GET] vehicle.controller/getVehicle. Missing idVehicle field.`)
			return res.status(responseStatus).send(responseContents)
		}

		const vehicle = await prisma.vehicle.findFirst({ where: { idVehicle: idVehicle } })

		if (!vehicle) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `No vehicle found with id: ${idVehicle}` }
			logger.warn(`[GET] vehicle.controller/getVehicle. No vehicle found with id: ${idVehicle}`)
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = vehicle
	} catch (error) {
		logger.error(`[GET] vehicle.controller/getVehicle Internal server error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[GET] vehicle.controller/getVehicle. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

/**
 * Retrieves all vehicles associated with a specific client from the database.
 *
 * @function getAllVehiclesFromclient
 * @async
 *
 * @param {Request} req - Express request object. Se espera que el campo `idClient` esté presente en `req.body`
 * para identificar al cliente cuyos vehículos se quieren recuperar.
 *
 * @param {Response} res - Express response object. Usado para devolver la lista de vehículos, o un mensaje
 * de error si la operación falla.
 *
 * @returns {Promise<Response>} - Devuelve una respuesta HTTP con base en el resultado de la operación:
 *
 * - `200 OK`: Retorna un arreglo con los vehículos del cliente.
 * - `400 Bad Request`: Si el campo `idClient` no fue proporcionado.
 * - `404 Not Found`: Si no se encontraron vehículos para el cliente dado.
 * - `500 Internal Server Error`: Si ocurrió un error durante la consulta a la base de datos.
 *
 * @example
 *  Request body:
 * {
 *   "idClient": 7
 * }
 *
 *  Success response:
 * [
 *   {
 *     "idVehicle": 1,
 *     "brand": "Toyota",
 *     "model": "Corolla",
 *     ...
 *   },
 *   ...
 * ]
 *
 *  Error response:
 * {
 *   "error": "idClient field required"
 * }
 */
export const getAllVehiclesFromclient = async (req: Request, res: Response) => {
	const { idClient } = req.body
	let responseStatus = StatusCodes.OK
	let responseContents

	try {
		if (!idClient) {
			responseStatus = StatusCodes.BAD_REQUEST
			responseContents = { error: 'idClient field required' }
			logger.warn(`[GET] vehicle.controller/getAllVehiclesFromClient. Missing idClient field.`)
			return res.status(responseStatus).send(responseContents)
		}

		const vehicles = await prisma.vehicle.findMany({ where: { cliente_idcliente: idClient } })

		if (!vehicles) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `Vehicles owned by client id ${idClient} not found` }
			logger.warn(`[GET] vehicle.controller/getAllVehiclesFromClient. Vehicles owned by client id ${idClient} not found`)
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = vehicles
		logger.info(`[GET] vehicle.controller/getAllVehiclesFromClient. Vehicles for client id ${idClient} retrieved successfully.`)
	} catch (error) {
		logger.error(`[GET] vehicle.controller/getAllVehiclesFromClient Internal server error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[GET] vehicle.controller/getAllVehiclesFromClient. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

/**
 * Updates an existing vehicle record in the database based on the provided fields.
 * Only the fields present in the request body will be updated; others will retain their current values.
 *
 * @param {Request} req - Express request object containing the vehicle fields to update.
 *   Expected fields in the body:
 *     - `idVehicle` (required): The unique identifier of the vehicle to update.
 *     - Optional fields: `brand`, `model`, `year`, `color`, `plate`, `doors`, `motor`.
 *
 * @param {Response} res - Express response object used to return status and result of the operation.
 *
 * @returns {Response} Returns a JSON response with a success message and the updated vehicle data,
 * or an error message with appropriate HTTP status codes:
 *   - 200 OK: Vehicle updated successfully.
 *   - 400 Bad Request: If `idVehicle` is missing.
 *   - 404 Not Found: If no vehicle exists with the provided `idVehicle`.
 *   - 500 Internal Server Error: If a server/database error occurs.
 *
 * @example
 *  PUT /vehicle/update
 * {
 *   "idVehicle": "abc123",
 *   "color": "Red"
 * }
 *  Response:
 * {
 *   "message": "Vehicle updated successfully",
 *   "vehicle": {
 *     ... // updated vehicle data
 *   }
 * }
 */
export const updateVehicle = async (req: Request, res: Response) => {
	const { idVehicle, brand, model, year, color, plate, doors,motor } = req.body
    let responseStatus = StatusCodes.OK
    let responseContents

    try {

        if(!idVehicle){
            responseStatus = StatusCodes.BAD_REQUEST
			responseContents = { error: 'idVehicle field required' }
			logger.warn(`[PUT] vehicle.controller/updateVehicle. Missing idVehicle field.`)
			return res.status(responseStatus).send(responseContents)
        }
		const vehicle = await prisma.vehicle.findUnique({ where: { idVehicle: idVehicle } })

		if (!vehicle) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `No vehicle found with id: ${idVehicle}` }
			logger.warn(`[PUT] vehicle.controller/updateVehicle. No vehicle found with id: ${idVehicle}`)
			return res.status(responseStatus).send(responseContents)
		}

		const vehicleDetails: Vehicle = {
			cliente_idcliente: vehicle.cliente_idcliente,
			brand: brand ? brand : vehicle.brand,
			model: model ? model : vehicle.model,
			year : year ? year : vehicle.year,
			color: color ? color : vehicle.color,
			plate: plate ? plate : vehicle.plate,
			doors: doors ? doors : vehicle.doors,
			motor: motor ? motor : vehicle.motor,
		}

		const updatedVehicle = await prisma.vehicle.update({
			where: { idVehicle: idVehicle },
			data: {
				brand: vehicleDetails.brand,
				model: vehicleDetails.model,
				year: vehicleDetails.year,
				color: vehicleDetails.color,
				plate: vehicleDetails.plate,
				doors: vehicleDetails.doors,
				motor: vehicleDetails.motor,
				updatedAt: new Date()
			},
		})

		if (!updatedVehicle) {
			responseStatus = StatusCodes.CONFLICT
			responseContents = { error: `Vehicle with id ${idVehicle} cannot be updated, check logs, details: ${updatedVehicle}` }
			logger.error(`[PUT] vehicle.controller/updateVehicle. Vehicle with id ${idVehicle} cannot be updated, check logs: ${updatedVehicle}`)
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = { message: 'Vehicle updated successfully', vehicle: updatedVehicle }
		logger.info(`[PUT] vehicle.controller/updateVehicle. Vehicle with id ${idVehicle} updated successfully.`)


    } catch (error) {
		logger.error(`[PUT] vehicle.controller/updateVehicle Internal server error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[PUT] vehicle.controller/updateVehicle. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
    }

	return res.status(responseStatus).send(responseContents)
}


export const deteleVehicle = async (req: Request, res: Response) => {}

