import express from 'express'
import authRoutes from './auth.routes'
import clientRoutes from './client.routes'
import vehicleRoutes from './vehicle.routes'
import inventoryRoutes from './inventory.routes'
import serviceRoutes from './service.routes'

const baseRouter = express.Router()

authRoutes(baseRouter)
clientRoutes(baseRouter)
vehicleRoutes(baseRouter)
inventoryRoutes(baseRouter)
serviceRoutes(baseRouter)

export default baseRouter