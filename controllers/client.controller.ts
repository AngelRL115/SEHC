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
	zipCode?: string
	fiscalRegimen?: string
	email?: string
}

export const newClient = async (req: Request, res: Response) => {
	const { name, lastName, phone, invoice, socialReazon, zipCode, fiscalRegimen, email } = req.body

	let responseStatus = StatusCodes.CREATED
	let responseContents

	if (!name || !lastName || !phone || invoice === undefined) {
		responseStatus = StatusCodes.BAD_REQUEST
		responseContents = { error: 'name, lastName, phone and invoice fields are required' }
		return res.status(responseStatus).send(responseContents)
	}
	const newClient: Client = {
		name,
		lastName,
		phone,
		invoice,
		socialReazon: invoice ? socialReazon : null,
		zipCode: invoice ? zipCode : null,
		fiscalRegimen: invoice ? fiscalRegimen : null,
		email: invoice ? email : null,
	}

	try {
		const saveClient = await prisma.client.create({
			data: {
				name: newClient.name,
				lastName: newClient.lastName,
				phone: newClient.phone,
				invoice: newClient.invoice,
			},
		})

        if(!saveClient) {
            throw new Error('Error saving client')
        }

		await prisma.invoice_client_data.create({
            data:{
                client_idclient: saveClient.idclient,
                socialReazon: newClient.socialReazon || null,
                zipCode: newClient.zipCode || null,
                fiscalRegimen: newClient.fiscalRegimen || null,
                email: newClient.email || null
            }
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
