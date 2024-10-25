import { Router } from 'express'
import * as AuthController from '../controllers/auth.controller'

const authRouter = Router()
const authRoutes = (baseRouter: Router) => {
	baseRouter.use('/auth', authRouter)

	/**
	 * @swagger
	 * /auth/registerUser:
	 *  post:
	 *      summary: Crear un nuevo usuario
	 *      tags: [Auth]
	 *      requestBody:
	 *          required: true
	 *          content:
	 *              application/json:
	 *                  schema:
	 *                      type: object
	 *                      properties:
	 *                          username:
	 *                              type: string
	 *                              example: jaimespartan117
	 *                          name:
	 *                              type: string
	 *                              example: Jaime
	 *                          lastName:
	 *                              type: string
	 *                              example: Zaragoza
	 *      responses:
	 *          201:
	 *              description: Usuario creado exitosamente
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              message:
	 *                                  type: string
	 *                                  example: User with username ${newUser.username} created
	 *          400:
	 *              description: Error creando el usuario. No se capturaron todos los campos de registro
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              error:
	 *                                  type: string
	 *                                  example: All fields are required
     *          409:
     *              description: Nombre de usuario ya existente
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              error:
     *                                  type: string
     *                                  example: Username already taken
     *          500:
     *              description: Error interno del servidor
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              error:
     *                                  type: string
     *                                  example: (post) authController/registerUser error ${error.message}
	 */
	authRouter.post('/registerUser', AuthController.registerUser)

	/**
	 * @swagger
	 * /auth/login:
	 *  post:
	 *      summary: Acceder al sistema
	 *      tags: [Auth]
	 *      requestBody:
	 *          required: true
	 *          content:
	 *              application/json:
	 *                  schema:
	 *                      type: object
	 *                      properties:
	 *                          username:
	 *                              type: string
	 *                              example: jaimespartan117
	 *      responses:
	 *          200:
	 *              description: Login exitoso
	 *              content:
	 *                  application/json:
	 *                      schema:
	 *                          type: object
	 *                          properties:
	 *                              token:
	 *                                  type: string
	 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjI0LCJpYXQiOjE3Mjk2ODE2OTgsImV4cCI6MTcyOTcxNzY5OH0.LHCc_1z74iFmKyccZ_OekPhD0IL5lGOpUa1nLP7ppTI"
	 *          400:
	 *              description: Error al hacer login, revisar solicitud
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              error:
     *                                  type: string
     *                                  example: Username not provided
     *          406:
     *              description: Usuario invalido, usuario mal escrito
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              error:
     *                                  type: string
     *                                  example: Incorrect username
     *          500:
     *              description: Error interno del servidor
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              error:
     *                                  type: string
     *                                  example: error ${error.messaje}
	 */
	authRouter.post('/login', AuthController.login)
}

export default authRoutes
