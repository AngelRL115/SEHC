import { Request, response, Response } from 'express'
import prisma from '../prisma/prisma'
import { StatusCodes } from 'http-status-codes'
import * as dotenv from 'dotenv'
import { Vehicle } from '../interfaces/Vehicle'
dotenv.config()



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

export const getVehicle = async (req: Request, res: Response) => {
	const { idVehicle } = req.body
	let responseStatus = StatusCodes.OK
	let responseContents

	try {
		if (!idVehicle) {
			responseStatus = StatusCodes.BAD_REQUEST
			responseContents = { error: 'idVehicle field required' }
			return res.status(responseStatus).send(responseContents)
		}

		const vehicle = await prisma.vehicle.findFirst({ where: { idVehicle: idVehicle } })

		if (!vehicle) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `No vehicle found with id: ${idVehicle}` }
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = vehicle
	} catch (error) {
		console.error(`[GET] vehicleController/getVehicle error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[GET] vehicleController/getVehicle. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}
export const getAllVehiclesFromclient = async (req: Request, res: Response) => {
	const { idClient } = req.body
	let responseStatus = StatusCodes.OK
	let responseContents

	try {
		if (!idClient) {
			responseStatus = StatusCodes.BAD_REQUEST
			responseContents = { error: 'idClient field required' }
			return res.status(responseStatus).send(responseContents)
		}

		const vehicles = await prisma.vehicle.findMany({ where: { cliente_idcliente: idClient } })

		if (!vehicles) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `Vehicles owned by client id ${idClient} not found` }
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = vehicles
	} catch (error) {
		console.error(`[GET] vehicleController/getAllVehiclesFromClient error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[GET] vehicleController/getAllVehiclesFromClient. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}
//SE NECESITA TERMINAR ESTE CONTROLLER Y ADEMAS LOS METODOS DE UPDATEVEHICLE Y DELETEVEHICLE
export const updateVehicle = async (req: Request, res: Response) => {
	const { idVehicle } = req.body
    let responseStatus = StatusCodes.OK
    let responseContents

    try {
        if(!idVehicle){
            responseStatus = StatusCodes.BAD_REQUEST
			responseContents = { error: 'idVehicle field required' }
			return res.status(responseStatus).send(responseContents)
        }
       


    } catch (error) {
        
    }
}
export const deteleVehicle = async (req: Request, res: Response) => {}

