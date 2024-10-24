import { Request, Response } from 'express'
//import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prisma/prisma'
import { StatusCodes } from 'http-status-codes'
import * as dotenv from 'dotenv'
dotenv.config()

// export const registerUserPassword = async (req: Request, res: Response) => {
//     const {username, password, name, lastName} = req.body
//     let responseStatus = StatusCodes.OK
//     let responseContents

//     try {
//         if(!username || !password || !name || !lastName ){
//             responseStatus = StatusCodes.BAD_REQUEST
//             responseContents = { error: 'All fields are required'}
//             return res.status(responseStatus).send(responseContents)
//         }
//         const existingUsername = await prisma.user.findFirst({where:{username:username}})

//         if(existingUsername){
//             responseStatus = StatusCodes.BAD_REQUEST
//             responseContents = {error: 'Username already taken'}
//             return res.status(responseStatus).send(responseContents)
//         }
//         const hashedPassword = await bcrypt.hash(password, 10)
//         const newUser = await prisma.user.create({
//             data:{
//                 username: username,
//                 password: hashedPassword,
//                 name: name,
//                 lastName: lastName,
                
//         }})
//         responseContents = {message: `User with username ${newUser.username} created`}

//     } catch (error) {
//         console.error(`[POST] authController/registerUser error: ${error}`)
//         responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
//         responseContents = {error: error}
//         return res.status(responseStatus).send(responseContents)
//     }
//     res.status(responseStatus).send(responseContents)
// }

// export const loginPassword = async (req: Request, res: Response) => {
//     const {username, password} = req.body
//     let responseStatus = StatusCodes.OK
//     let responseContents
//     try {
//         if(!username || !password){
//             responseStatus = StatusCodes.BAD_REQUEST
//             responseContents = {error:'Username or password not provided'}
//             return res.status(responseStatus).send(responseContents)
//         }

//         const validUsername = await prisma.user.findFirst({where: {username: username}})
//         if(!validUsername){
//             responseStatus = StatusCodes.BAD_REQUEST
//             responseContents = {error:'Username not exist'}
//             return res.status(responseStatus).send(responseContents)
//         }
//         const validPassword = await bcrypt.compare(password, validUsername.password)
//         if(!validPassword){
//             responseStatus = StatusCodes.BAD_REQUEST
//             responseContents = {error:'Invalid password'}
//             return res.status(responseStatus).send(responseContents)
//         }

//         const token = jwt.sign({userid: validUsername.idUser}, process.env.JWT_SECRET as string, {expiresIn: '10h'})
//         responseContents = {token}
        
//     } catch (error) {
//         console.error(`[POST] authController/loging error: ${error}`)
// 		responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
// 		responseContents = { error: error }
// 		return res.status(responseStatus).send(responseContents)
//     }
//     res.status(responseStatus).send(responseContents)
// }

// Función de registro de usuarios sin contraseña

export const registerUser = async (req: Request, res: Response) => {
    const { username, name, lastName } = req.body
    let responseStatus = StatusCodes.CREATED
    let responseContents

    try {
        // Validar que los campos requeridos estén presentes
        if (!username || !name || !lastName) {
            responseStatus = StatusCodes.BAD_REQUEST
            responseContents = { error: 'All fields are required' }
            return res.status(responseStatus).send(responseContents)
        }

        // Verificar si el nombre de usuario ya existe
        const existingUsername = await prisma.user.findFirst({ where: { username: username } })

        if (existingUsername) {
            responseStatus = StatusCodes.BAD_REQUEST
            responseContents = { error: 'Username already taken' }
            return res.status(responseStatus).send(responseContents)
        }

        // Crear el usuario sin contraseña
        const newUser = await prisma.user.create({
            data: {
                username: username,
                name: name,
                lastName: lastName,
            }
        })
        responseContents = { message: `User with username ${newUser.username} created` }

    } catch (error) {
        console.error(`[POST] authController/registerUser error: ${error}`)
        responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
        responseContents = { error: error }
        return res.status(responseStatus).send(responseContents)
    }
   return res.status(responseStatus).send(responseContents)
}

// Función de login sin contraseña
export const login = async (req: Request, res: Response) => {
    const { username } = req.body
    let responseStatus = StatusCodes.OK
    let responseContents
    try {
        // Validar que el nombre de usuario esté presente
        if (!username) {
            responseStatus = StatusCodes.BAD_REQUEST
            responseContents = { error: 'Username not provided' }
            return res.status(responseStatus).send(responseContents)
        }

        // Verificar si el nombre de usuario es válido
        const validUsername = await prisma.user.findFirst({ where: { username: username } })
        if (!validUsername) {
            responseStatus = StatusCodes.BAD_REQUEST
            responseContents = { error: 'Username does not exist' }
            return res.status(responseStatus).send(responseContents)
        }

        // Generar el token JWT sin necesidad de validar la contraseña
        const token = jwt.sign({ userid: validUsername.idUser }, process.env.JWT_SECRET as string, { expiresIn: '10h' })
        responseContents = { token }

    } catch (error) {
        console.error(`[POST] authController/login error: ${error}`)
        responseStatus = StatusCodes.INTERNAL_SERVER_ERROR
        responseContents = { error: error }
        return res.status(responseStatus).send(responseContents)
    }
    return res.status(responseStatus).send(responseContents)
}