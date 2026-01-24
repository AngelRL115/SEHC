import { Router } from 'express'
import * as authController from '../controllers/auth.controller'

const authRouter = Router()

const authRoutes = (baseRouter: Router) => {
	baseRouter.use('/auth', authRouter)

	/**
	 * @swagger
	 * /auth/register:
	 *   post:
	 *     summary: Registra un nuevo usuario en el sistema
	 *     tags: [Auth]
	 *     produces: [application/json]
	 *     security: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - username
	 *               - name
	 *               - lastName
	 *             properties:
	 *               username:
	 *                 type: string
	 *                 example: angel123
	 *               name:
	 *                 type: string
	 *                 example: Ángel
	 *               lastName:
	 *                 type: string
	 *                 example: Rodríguez
	 *     responses:
	 *       201:
	 *         description: Usuario creado exitosamente
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 message:
	 *                   type: string
	 *                   example: User with username angel123 created
	 *       400:
	 *         description: Faltan campos requeridos
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: All fields are required
	 *       409:
	 *         description: El nombre de usuario ya existe
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Username already taken
	 *       500:
	 *         description: Error interno del servidor
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Internal server error
	 */
	authRouter.post('/register', authController.registerUser)

	/**
	 * @swagger
	 * /auth/login:
	 *   post:
	 *     summary: Autentica un usuario y devuelve un token JWT
	 *     tags: [Auth]
	 *     produces: [application/json]
	 *     security: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             required:
	 *               - username
	 *             properties:
	 *               username:
	 *                 type: string
	 *                 example: angel123
	 *     responses:
	 *       200:
	 *         description: Login exitoso
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 token:
	 *                   type: string
	 *                   description: Token JWT para autenticación
	 *       400:
	 *         description: No se proporcionó el nombre de usuario
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Username not provided
	 *       401:
	 *         description: Nombre de usuario incorrecto
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Incorrect username
	 *       500:
	 *         description: Error interno del servidor
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   example: Internal server error
	 */
	authRouter.post('/login', authController.login)
}

export default authRoutes
