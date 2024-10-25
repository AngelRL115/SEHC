import express from 'express'
import authRoutes from './auth.routes'
import clientRoutes from './client.routes'

const baseRouter = express.Router()

authRoutes(baseRouter)
clientRoutes(baseRouter)

export default baseRouter