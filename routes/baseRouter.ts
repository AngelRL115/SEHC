import express from 'express'
import authRoutes from './auth.routes'
import clientRoutes from './client.routes'
import vehicleRoutes from './vehicle.routes'

const baseRouter = express.Router()

authRoutes(baseRouter)
clientRoutes(baseRouter)
vehicleRoutes(baseRouter)

export default baseRouter