import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../prisma/prisma'
import { StatusCodes } from 'http-status-codes'
import * as dotenv from 'dotenv'
dotenv.config()

interface Client {
	name: string
	lastName: string
	phone: string
	invoice: boolean
	socialReazon?: string
	zipcode?: string
	fiscalRegimen?: string
	email?: string
}

export const newClient = async (req: Request, res: Response) => {
	const { name, lastName, phone, invoice, socialReazon, zipcode, fiscalRegimen, email } = req.body

	let responseStatus = StatusCodes.CREATED
	let responseContents

	// Validación de campos obligatorios
	if (!name || !lastName || !phone || invoice === undefined) {
		responseStatus = StatusCodes.BAD_REQUEST
		responseContents = { error: 'name, lastName, phone and invoice (true or false) fields are required' }
		return res.status(responseStatus).send(responseContents)
	}

	const newClient: Client = {
		name,
		lastName,
		phone,
		invoice,
		socialReazon: invoice ? socialReazon : null,
		zipcode: invoice ? zipcode : null,
		fiscalRegimen: invoice ? fiscalRegimen : null,
		email: invoice ? email : null,
	}

	try {
		await prisma.client.create({
			data: {
				name: newClient.name,
				lastName: newClient.lastName,
				phone: newClient.phone,
				invoice: newClient.invoice,
				socialReazon: newClient.socialReazon,
				zipcode: newClient.zipcode,
				fiscalRegimen: newClient.fiscalRegimen,
				email: newClient.email,
			},
		})

		responseContents = { message: 'Client Registered successfully' }
	} catch (error) {
		console.error(`[POST] clientController/newClient error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

export const updateClientInvoiceDetails = async (req: Request, res: Response) => {}
export const updateClientDetails = async (req: Request, res: Response) => {}
export const getClientDetails = async (req: Request, res: Response) => {}
export const getAllClients = async (req: Request, res: Response) => {}
