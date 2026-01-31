import express from 'express'
import baseRouter from './routes/baseRouter'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { swaggerOptions } from './config/swagger'
import log, {morganStream} from './logger/logger'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const logger = morgan('combined', {stream: morganStream})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())
app.use(logger)
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.disable('x-powered-by')

const swaggerDocs = swaggerJsdoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/SEHC', baseRouter)

app.use((_req, res) => {
	res.status(404).send({ error: 'invalid route' })
})

app.get('/', (_req, res) => {
	res.send('Hola mundo')
})

app.listen(PORT, () => {
	log.info(`Server running on port ${PORT}`)
})
