import { Request, Response } from 'express'
import prisma from '../prisma/prisma'
import { StatusCodes } from 'http-status-codes'
import * as dotenv from 'dotenv'
dotenv.config()

interface Client {
	name: string
	lastName: string
	phone: string
	invoice: boolean
	socialReason?: string
	zipcode?: string
	fiscalRegimen?: string
	email?: string
}

interface InvoiceData {
	idClient: number
	invoice: boolean
	socialReason: string
	zipcode: string
	fiscalRegimen: string
	email: string
}

interface ClientPersonalData {
	idClient: number
	name: string
	lastName: string
	phone: string
}

export const newClient = async (req: Request, res: Response) => {
	const { name, lastName, phone, invoice, socialReason, zipcode, fiscalRegimen, email } = req.body

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
		socialReason: invoice ? socialReason : null,
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
				socialReazon: newClient.socialReason,
				zipcode: newClient.zipcode,
				fiscalRegimen: newClient.fiscalRegimen,
				email: newClient.email,
			},
		})

		responseContents = { message: 'Client Registered successfully' }
	} catch (error) {
		console.error(`[POST] clientController/newClient error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[POST] clientController/newClient. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

export const updateClientInvoiceDetails = async (req: Request, res: Response) => {
	const { idClient, invoice, socialReason, zipcode, fiscalRegimen, email } = req.body

	let responseStatus = StatusCodes.OK
	let responseContents

	const invoiceDetails: InvoiceData = {
		idClient,
		invoice,
		socialReason,
		zipcode,
		fiscalRegimen,
		email,
	}

	try {
		const updatedInvoiceData = await prisma.client.update({
			where: { idclient: invoiceDetails.idClient },
			data: {
				invoice: invoiceDetails.invoice,
				socialReazon: invoiceDetails.socialReason,
				zipcode: invoiceDetails.zipcode,
				fiscalRegimen: invoiceDetails.fiscalRegimen,
				email: invoiceDetails.email,
			},
		})
		if (!updatedInvoiceData) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `No client found with ID: ${idClient}. Update cannot be performed` }
			return res.status(responseStatus).send(responseContents)
		}

		if (
			updatedInvoiceData.invoice !== invoice ||
			updatedInvoiceData.socialReazon !== socialReason ||
			updatedInvoiceData.zipcode !== zipcode ||
			updatedInvoiceData.fiscalRegimen !== fiscalRegimen ||
			updatedInvoiceData.email !== email
		) {
			responseStatus = StatusCodes.CONFLICT
			responseContents = { error: `Update failed. Data was not correctly updated for client with ID: ${idClient}` }
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = { message: 'Data updated, now client has details for invoices' }
	} catch (error) {
		console.error(`[PUT] clientController/updateClientInvoiceDetails error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[PUT] clientController/updateClientInvoiceDetails. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

export const updateClientDetails = async (req: Request, res: Response) => {
	const { idClient, name, lastName, phone } = req.body
	let responseStatus = StatusCodes.OK
	let responseContents

	const personalData: ClientPersonalData = {
		idClient,
		name,
		lastName,
		phone,
	}

	try {
		const updatedDetails = await prisma.client.update({
			where: { idclient: personalData.idClient },
			data: {
				name: personalData.name,
				lastName: personalData.lastName,
				phone: personalData.phone,
			},
		})
		if (!updatedDetails) {
			responseStatus = StatusCodes.CONFLICT
			responseContents = { error: `Update cannot be performed see log details ${updatedDetails}` }
			return res.status(responseStatus).send(responseContents)
		}

		if (updatedDetails.name !== name || updatedDetails.lastName !== lastName || updatedDetails.phone !== phone) {
			responseStatus = StatusCodes.CONFLICT
			responseContents = { error: `Update failed. Data was not correctly updated for client with ID: ${idClient}` }
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = { message: 'Basic personal information updated' }
	} catch (error) {
		console.error(`[PUT] clientController/updateClientDetails error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[PUT] clientController/updateClientDetails. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

export const getClientDetails = async (req: Request, res: Response) => {
	const { idClient } = req.body
	let responseStatus = StatusCodes.OK
	let responseContents

	try {
		const clientData = await prisma.client.findUnique({
			where: { idclient: idClient },
		})

		if (!clientData) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `No client found with ID: ${idClient}` }
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = clientData
	} catch (error) {
		console.error(`[GET] clientController/getClientDetails error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[GET] clientController/getClientDetails. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

export const getAllClients = async (req: Request, res: Response) => {
	let responseStatus = StatusCodes.OK
	let responseContents

	try {
		const allClients = await prisma.client.findMany()

		if (!allClients) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `No clients found, check error logs: ${allClients}` }
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = allClients
	} catch (error) {
		console.error(`[GET] clientController/getAllClients error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[GET] clientController/getAllClients. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}
