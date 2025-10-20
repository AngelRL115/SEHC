import { Router } from "express"
import * as vehicleController from "../controllers/vehicle.controller"


const vehicleRouter = Router()
const vehicleRoutes = (baseRouter: Router) =>{
    baseRouter.use('/vehicle', vehicleRouter)

    vehicleRouter.post('/newVehicle', vehicleController.newVehicle)
    vehicleRouter.get('/getVehicle', vehicleController.getVehicle)
    vehicleRouter.get('/getAllVehicles', vehicleController.getAllVehicles)
    vehicleRouter.get('/getAllVehiclesFromClient', vehicleController.getAllVehiclesFromClient)
    vehicleRouter.patch('/updateVehicle/', vehicleController.updateVehicle)
    vehicleRouter.delete('/deleteVehicle', vehicleController.deleteVehicle)
}
export default vehicleRoutes