import { Router } from 'express'
import * as AuthController from '../controllers/auth.controller'

const authRouter = Router()
const authRoutes = (baseRouter: Router) => {
    baseRouter.use('/auth', authRouter)

    /**
     * @swagger
     * /auth/registerUser:
     *  post:
     *      sumary: Crear un nuevo usuario
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
     *      sumary: Acceder al sistema
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
     *          400:
     *              description: Error al hacer login, revisar solicitud
     */
    authRouter.post('/login', AuthController.login)
}

export default authRoutes