import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../prisma/prisma'
import { StatusCodes } from 'http-status-codes'
import * as dotenv from 'dotenv'
import logger from '../logger/logger'
import { User } from '../interfaces/User'
dotenv.config()

/**
 * Registers a new user if the provided `username`, `name`, and `lastName` are valid
 * and the username is not already taken.
 *
 * @function registerUser
 * @async
 * 
 * @param {Request} req - Express request object, expected to contain `username`, `name`, and `lastName` in the body.
 * @param {Response} res - Express response object used to send back appropriate HTTP status codes and messages.
 * 
 * @returns {Promise<Response>} - Returns a response with one of the following status codes:
 * 
 * - `201 Created`: User was successfully registered.
 * - `400 Bad Request`: One or more required fields are missing.
 * - `409 Conflict`: Username is already taken.
 * - `500 Internal Server Error`: An unexpected error occurred.
 * 
 * @example
 *  Request body:
 * {
 *   "username": "angel123",
 *   "name": "Ángel",
 *   "lastName": "Rodríguez"
 * }
 * 
 *  Successful response:
 * {
 *   "message": "User with username angel123 created"
 * }
 */
export const registerUser = async (req: Request, res: Response) => {
	const { username, name, lastName } = req.body
	let responseContents = {}

	try {
		// Validar que los campos requeridos estén presentes
		if (!username || !name || !lastName) {
			responseContents = { error: 'All fields are required' }
			logger.warn(`[POST] auth.controller/registerUser. Missing required fields: ${JSON.stringify(req.body)}.`)
			return res.status(StatusCodes.BAD_REQUEST).send(responseContents)
		}

		// Verificar si el nombre de usuario ya existe
		const existingUsername = await prisma.user.findFirst({ where: { username: username } })

		if (existingUsername) {
			responseContents = { error: 'Username already taken' }
			logger.info(`[POST] auth.controller/registerUser. Username already taken: ${username}.`)
			return res.status(StatusCodes.CONFLICT).send(responseContents)
		}

		const user: User = {
			username,
			name,
			lastName,
		}

		// Crear el usuario sin contraseña
		const newUser = await prisma.user.create({
			data: {
				username: user.username,
				name: user.name,
				lastName: user.lastName,
			},
		})
		responseContents = { message: `User with username ${newUser.username} created` }
		logger.info(`[POST] auth.controller/registerUser. User created: ${newUser.idUser}, username: ${newUser.username}.`)
	} catch (error) {
		logger.error(`[POST] authController/registerUser error: ${error}`)
		responseContents = { error: error }
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseContents)
	}
	return res.status(StatusCodes.CREATED).send(responseContents)
}


/**
 * Authenticates a user based on the provided `username`, and returns a JWT token
 * if the login is successful. This implementation does not include password validation.
 *
 * @function login
 * @async
 * 
 * @param {Request} req - Express request object, expected to contain the `username` field in the body.
 * @param {Response} res - Express response object used to return appropriate HTTP responses.
 * 
 * @returns {Promise<Response>} - Sends one of the following HTTP responses:
 * 
 * - `200 OK`: Login successful. Returns a JWT token in the response body.
 * - `400 Bad Request`: The username was not provided.
 * - `401 Unauthorized`: The username does not exist in the database.
 * - `500 Internal Server Error`: An unexpected server error occurred.
 * 
 * @example
 *  Request body:
 * {
 *   "username": "angel123"
 * }
 * 
 *  Successful response:
 * {
 *   "token": "<jwt-token>"
 * }
 * 
 *  Error response (missing username):
 * {
 *   "error": "Username not provided"
 * }
 */
export const login = async (req: Request, res: Response) => {
	const { username } = req.body
	let responseContents = {}
	try {
		// Validar que el nombre de usuario esté presente
		if (!username) {
			logger.warn(`[POST] auth.controller/login. Missing credential.`)
			responseContents = { error: 'Username not provided' }
			return res.status(StatusCodes.BAD_REQUEST).send(responseContents)
		}

		//hace log del username que se ingresa, funcional para cuando queremos ver si hay algun error cuando alquien intenta iniciar sesion y dice que no jala
		logger.info(`[POST] auth.controller/login. Attempting login with credential: ${username}.`)

		// Verificar si el nombre de usuario es válido
		const validUsername = await prisma.user.findFirst({ where: { username: username } })

		if (!validUsername) {
			logger.warn(`[POST] auth.controller/login. Incorrect username: ${username}`)
			responseContents = { error: 'Incorrect username' }
			return res.status(StatusCodes.UNAUTHORIZED).send(responseContents)
		}

		const payloadForPassport = {
			idUser: validUsername.idUser,
			username: validUsername.username,
			name: validUsername.name,
		}
		// Generar el token JWT sin necesidad de validar la contraseña
		const token = jwt.sign(payloadForPassport, process.env.JWT_SECRET as string, { expiresIn: '10h' })
		responseContents = { token }
		// Log success
		logger.info(`[POST] auth.controller/login. User ${validUsername.username} logged in successfully.`)
	} catch (error) {
		logger.error(`[POST] auth.controller/login. Error trying to login: ${error}.`)
		responseContents = { error: `[POST] auth.controller/login. Internal server error: ${error}.` }
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseContents)
	}
	return res.status(StatusCodes.OK).send(responseContents)
}
