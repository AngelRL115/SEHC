import { Request, response, Response } from 'express'
import prisma from '../prisma/prisma'
import { StatusCodes } from 'http-status-codes'
import * as dotenv from 'dotenv'
import { verify } from 'crypto'
dotenv.config()

interface Vehicle {
	cliente_idcliente: number
	brand: string
	model: string
	year: string
	color: string
	plate: string
	doors: number
	motor: string
}

export const newVehicle = async (req: Request, res: Response) => {
	const { idClient, brand, model, year, color, plate, doors, motor } = req.body
	let responseStatus = StatusCodes.CREATED
	let responseContents

	try {
		if (!idClient) {
			responseStatus = StatusCodes.BAD_REQUEST
			responseContents = { error: 'idClient is a required field, please ensure that you are passing it' }
			return res.status(responseStatus).send(responseContents)
		}
		if (!brand || !model || !year || !color || !plate || !doors || !motor) {
			responseStatus = StatusCodes.BAD_REQUEST
			responseContents = { error: 'all fields are required, please check them out on payload object or consult the swagger documentation' }
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
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = { message: 'New vehicle registered' }
	} catch (error) {
		console.error(`[POST] vehicleController/newVehicle error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[POST] vehicleController/newVehicle. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}
