import { createLogger, format, transports } from 'winston'

//winston configuration
const logger = createLogger({
	level: 'info', //logging level (info, warn, error, debug, etc.)
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf(({ timestamp, level, message }) => {
			return `[${timestamp}] ${level.toUpperCase()}: ${message}`
		}),
	),
	transports: [
		new transports.Console(), //console logging
		new transports.File({ filename: 'logs/app.log' }), //logs on physical log file
		new transports.File({ filename: 'logs/error.log', level: 'error' }), //logs on physical log file for errors
	],
})

export const morganStream = {
	write: (message: string) => logger.http(message.trim()),
}

export default logger
