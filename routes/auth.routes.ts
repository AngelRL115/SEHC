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
     *          400:
     *              description: Error creando el usuario
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
     *              description: Loging exitoso
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
     */
    authRouter.post('/login', AuthController.login)
}

export default authRoutes