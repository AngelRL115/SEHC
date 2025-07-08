import { Request, response, Response } from 'express'
import prisma from '../prisma/prisma'
import { StatusCodes } from 'http-status-codes'
import * as dotenv from 'dotenv'
import { Vehicle } from '../interfaces/Vehicle'
import logger from '../logger/logger'
dotenv.config()



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
	} catch (error) {
		logger.error(`[GET] vehicle.controller/getAllVehiclesFromClient Internal server error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[GET] vehicle.controller/getAllVehiclesFromClient. Internal server error: ${error}` }
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
			logger.warn(`[PUT] vehicle.controller/updateVehicle. Missing idVehicle field.`)
			return res.status(responseStatus).send(responseContents)
        }
       


    } catch (error) {
        
    }
}
export const deteleVehicle = async (req: Request, res: Response) => {}

