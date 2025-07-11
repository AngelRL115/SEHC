import { Request, Response } from 'express'
import prisma from '../prisma/prisma'
import { StatusCodes } from 'http-status-codes'
import * as dotenv from 'dotenv'
import { Client } from '../interfaces/Client'
import { ClientPersonalData } from '../interfaces/ClientPersonalData'
import { InvoiceData } from '../interfaces/InvoiceData'
import logger from '../logger/logger'

dotenv.config()

/**
 * Registers a new client in the database after validating required fields.
 * If the `invoice` field is true, additional fiscal data is expected.
 *
 * @function newClient
 * @async
 * 
 * @param {Request} req - Express request object. The body should contain:
 * 
 * - `name` (string) - Client's first name (required)
 * - `lastName` (string) - Client's last name (required)
 * - `phone` (string) - Contact number (required)
 * - `invoice` (boolean) - Whether the client requires an invoice (required)
 * - `socialReason` (string|null) - Fiscal name (required if invoice is true)
 * - `zipcode` (string|null) - ZIP code (required if invoice is true)
 * - `fiscalRegimen` (string|null) - Fiscal regimen (required if invoice is true)
 * - `email` (string|null) - Email address (required if invoice is true)
 * 
 * @param {Response} res - Express response object, used to send the response back to the client.
 * 
 * @returns {Promise<Response>} - Sends one of the following HTTP responses:
 * 
 * - `201 Created`: Client registered successfully.
 * - `400 Bad Request`: Required fields are missing.
 * - `500 Internal Server Error`: Unexpected error while registering the client.
 * 
 * @example
 *  Request body when invoice is false:
 * {
 *   "name": "Juan",
 *   "lastName": "Pérez",
 *   "phone": "5551234567",
 *   "invoice": false
 * }
 * 
 *  Request body when invoice is true:
 * {
 *   "name": "Juan",
 *   "lastName": "Pérez",
 *   "phone": "5551234567",
 *   "invoice": true,
 *   "socialReason": "Empresa XYZ S.A.",
 *   "zipcode": "12345",
 *   "fiscalRegimen": "601",
 *   "email": "facturas@xyz.com"
 * }
 * 
 *  Success response:
 * {
 *   "message": "Client Registered successfully"
 * }
 * 
 *  Error response:
 * {
 *   "error": "name, lastName, phone and invoice (true or false) fields are required."
 * }
 */
export const newClient = async (req: Request, res: Response) => {
	const { name, lastName, phone, invoice, socialReason, zipcode, fiscalRegimen, email } = req.body

	let responseStatus = StatusCodes.CREATED
	let responseContents

	// Validación de campos obligatorios
	if (!name || !lastName || !phone || invoice === undefined) {
		responseStatus = StatusCodes.BAD_REQUEST
		responseContents = { error: 'name, lastName, phone and invoice (true or false) fields are required.' }
		logger.warn(`[POST] client.controller/newClient. Missing required fields.`)
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
				createdAt: new Date(),
				updatedAt: new Date()
			},
		})

		responseContents = { message: 'Client Registered successfully' }
		logger.info(`[POST] client.controller/newClient. Client Registered successfully with name: ${newClient.name} ${newClient.lastName}`)
	} catch (error) {
		logger.error(`[POST] clientController/newClient error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[POST] clientController/newClient. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

/**
 * Updates a client's invoice-related information in the database based on the data provided in the request body.
 *
 * @function updateClientInvoiceDetails
 * @async
 *
 * @param {Request} req - Express request object. The body must include the following fields:
 * 
 * - `idClient` (number) - Unique identifier of the client (required)
 * - `invoice` (boolean) - Whether the client requires an invoice (required)
 * - `socialReason` (string|null) - Fiscal name (required if invoice is true)
 * - `zipcode` (string|null) - ZIP code (required if invoice is true)
 * - `fiscalRegimen` (string|null) - Fiscal regimen (required if invoice is true)
 * - `email` (string|null) - Email address (required if invoice is true)
 *
 * @param {Response} res - Express response object used to send appropriate responses to the client.
 *
 * @returns {Promise<Response>} - Sends one of the following HTTP responses:
 * 
 * - `200 OK`: Update successful.
 * - `404 Not Found`: Client with provided ID does not exist.
 * - `406 Not Acceptable`: Data in the database does not match the provided update (likely failed).
 * - `500 Internal Server Error`: Unexpected error during the update process.
 *
 * @example
 *  Request body:
 * {
 *   "idClient": 7,
 *   "invoice": true,
 *   "socialReason": "XYZ Corp",
 *   "zipcode": "01234",
 *   "fiscalRegimen": "601",
 *   "email": "xyz@company.com"
 * }
 *
 *  Success response:
 * {
 *   "message": "Data updated, now client has details for invoices"
 * }
 *
 *  Failure example (client not found):
 * {
 *   "error": "No client found with ID: 7. Update cannot be performed"
 * }
 */
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
				socialReazon: invoiceDetails.invoice ? invoiceDetails.socialReason : null,
				zipcode: invoiceDetails.invoice ? invoiceDetails.zipcode : null,
				fiscalRegimen: invoiceDetails.invoice ? invoiceDetails.fiscalRegimen : null,
				email: invoiceDetails.invoice ? invoiceDetails.email : null,
				updatedAt: new Date()
			},
		})
		if (!updatedInvoiceData) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `No client found with ID: ${idClient}. Update cannot be performed` }
			logger.warn(`[PUT] client.controller/updateClientInvoiceDetails. No client found with ID: ${idClient}. Update cannot be performed`)
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = { message: 'Data updated, now client has details for invoices' }
		logger.info(`[PUT] client.controller/updateClientInvoiceDetails. Cata updated, now client has details for invoices`)
	} catch (error) {
		logger.error(`[PUT] clientController/updateClientInvoiceDetails error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[PUT] clientController/updateClientInvoiceDetails. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

/**
 * Updates a client's basic personal information (`name`, `lastName`, and `phone`) in the database
 * based on the provided client ID.
 *
 * @function updateClientDetails
 * @async
 *
 * @param {Request} req - Express request object. The body debe contener:
 * 
 * - `idClient` (number) - Unique identifier of the client (required)
 * - `name` (string) - Updated first name of the client (required)
 * - `lastName` (string) - Updated last name of the client (required)
 * - `phone` (string) - Updated phone number (required)
 *
 * @param {Response} res - Express response object used to return the operation result to the client.
 *
 * @returns {Promise<Response>} - Returns one of the following HTTP responses:
 * 
 * - `200 OK`: Client data was successfully updated.
 * - `404 Not Found`: Client with the provided ID does not exist (not explicitly handled, but recomendable).
 * - `406 Not Acceptable`: Data in the database does not match the expected update.
 * - `409 Conflict`: Update could not be performed (e.g., invalid state or data conflict).
 * - `500 Internal Server Error`: An error occurred during the update process.
 *
 * @example
 *  Request body:
 * {
 *   "idClient": 12,
 *   "name": "María",
 *   "lastName": "López",
 *   "phone": "5512345678"
 * }
 * 
 *  Success response:
 * {
 *   "message": "Basic personal information updated"
 * }
 * 
 *  Failure example (update mismatch):
 * {
 *   "error": "Update failed. Data was not correctly updated for client with ID: 12"
 * }
 */
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
		const existingClient = await prisma.client.findUnique({
			where: { idclient: personalData.idClient },
		})
		if (!existingClient) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `No client found with ID: ${personalData.idClient}` }
			logger.warn(`[PUT] client.controller/updateClientDetails. No client found with ID: ${personalData.idClient}`)
			return res.status(responseStatus).send(responseContents)
		}

		const updatedDetails = await prisma.client.update({
			where: { idclient: personalData.idClient },
			data: {
				name: name ? personalData.name : existingClient.name,
				lastName: lastName ? personalData.lastName : existingClient.lastName,
				phone: phone ? personalData.phone : existingClient.phone,
				updatedAt: new Date()
			},
		})
		if (!updatedDetails) {
			responseStatus = StatusCodes.CONFLICT
			responseContents = { error: `Update cannot be performed see log details ${updatedDetails}` }
			logger.warn(`[PUT] client.controller/updateClientDetails. Update cannot be performed see log details ${updatedDetails}`)
			return res.status(responseStatus).send(responseContents)
		}

		

		responseContents = { message: 'Basic personal information updated'}
		logger.info(`[PUT] client.controller/updateClientDetails. Basic personal information updated for client with ID: ${idClient}`)
	} catch (error) {
		logger.error(`[PUT] clientController/updateClientDetails error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[PUT] clientController/updateClientDetails. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

/**
 * Retrieves client details from the database using the provided `idClient`.
 *
 * @function getClientDetails
 * @async
 *
 * @param {Request} req - Express request object. The body must include:
 * 
 * - `idClient` (number) - Unique identifier of the client to retrieve (required)
 *
 * @param {Response} res - Express response object used to return the client details or error information.
 *
 * @returns {Promise<Response>} - Sends one of the following HTTP responses:
 * 
 * - `200 OK`: Client found, returns client data.
 * - `404 Not Found`: No client found with the given ID.
 * - `500 Internal Server Error`: Unexpected error during the retrieval process.
 *
 * @example
 *  Request body:
 * {
 *   "idClient": 7
 * }
 *
 *  Success response:
 * {
 *   "idclient": 7,
 *   "name": "Juan",
 *   "lastName": "Pérez",
 *   "phone": "5512345678",
 *   "invoice": false,
 *   "createdAt": "2024-10-10T00:00:00.000Z",
 *   "updatedAt": "2024-10-11T00:00:00.000Z"
 * }
 *
 *  Error response (not found):
 * {
 *   "error": "No client found with ID: 7"
 * }
 */
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
			responseContents = { error: `Client not found with ID: ${idClient}` }
			logger.warn(`[GET] client.controller/getClientDetails. Client not found with ID: ${idClient}`)
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = clientData
	} catch (error) {
		logger.error(`[GET] clientController/getClientDetails error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[GET] clientController/getClientDetails. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}

/**
 * Retrieves all clients stored in the database using Prisma ORM.
 * Handles the case when no clients exist, as well as internal server errors.
 *
 * @function getAllClients
 * @async
 *
 * @param {Request} req - Express request object. Not used in this function, but provided by the route handler.
 *
 * @param {Response} res - Express response object used to return the list of clients or an error message.
 *
 * @returns {Promise<Response>} - Sends one of the following HTTP responses:
 *
 * - `200 OK`: Returns an array of all clients.
 * - `404 Not Found`: No clients were found in the database.
 * - `500 Internal Server Error`: An error occurred while retrieving the clients.
 *
 * @example
 *  Success response:
 * [
 *   {
 *     "idclient": 1,
 *     "name": "Ana",
 *     "lastName": "García",
 *     "phone": "5550001234",
 *     "invoice": false,
 *     "createdAt": "2024-09-01T12:00:00.000Z",
 *     "updatedAt": "2024-09-02T12:00:00.000Z"
 *   },
 *   {
 *     "idclient": 2,
 *     "name": "Luis",
 *     "lastName": "Hernández",
 *     "phone": "5550005678",
 *     "invoice": true,
 *     ...
 *   }
 * ]
 *
 *  Error response (no clients):
 * {
 *   "error": "No clients found, check error logs: []"
 * }
 */
export const getAllClients = async (req: Request, res: Response) => {
	let responseStatus = StatusCodes.OK
	let responseContents

	try {
		const allClients = await prisma.client.findMany()

		if (!allClients) {
			responseStatus = StatusCodes.NOT_FOUND
			responseContents = { error: `No clients found, check error logs: ${allClients}` }
			logger.warn(`[GET] client.controller/getAllClients. No clients found check error logs: ${allClients}`)
			return res.status(responseStatus).send(responseContents)
		}

		responseContents = allClients
	} catch (error) {
		logger.error(`[GET] clientController/getAllClients error: ${error}`)
		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
		responseContents = { error: `[GET] clientController/getAllClients. Internal server error: ${error}` }
		return res.status(responseStatus).send(responseContents)
	}

	return res.status(responseStatus).send(responseContents)
}
