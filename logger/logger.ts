import { createLogger, format, transports, transport } from 'winston'

const { combine, timestamp, printf, colorize, json, errors } = format

// Determine log level based on environment, default to 'info'
const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug'

// Define the format for the console
const consoleFormat = combine(
	colorize(),
	timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	errors({ stack: true }), // Show stack trace for errors
	printf(({ timestamp, level, message, stack }) => {
		// If there's a stack, print it. Otherwise, just print the message.
		const logMessage = stack ? stack : message
		return `[${timestamp}] ${level}: ${logMessage}`
	}),
)

// Define the format for files (JSON)
const fileFormat = combine(
	timestamp(),
	errors({ stack: true }), // Ensure stack traces are in the JSON
	json(),
)

const loggerTransports: transport[] = [
	// File transport for all logs (in JSON format)
	new transports.File({
		filename: 'logs/app.log',
		handleExceptions: true,
	}),
	// File transport specifically for errors (in JSON format)
	new transports.File({
		filename: 'logs/error.log',
		level: 'error',
		handleExceptions: true,
	}),
]

// Add console transport only if not in production
if (process.env.NODE_ENV !== 'production') {
	loggerTransports.push(
		new transports.Console({
			format: consoleFormat,
			handleExceptions: true,
		}),
	)
}

//winston configuration
const logger = createLogger({
	level: level, // Use dynamic level
	format: fileFormat,
	transports: loggerTransports, // Use dynamic transports
	exitOnError: false, // Do not exit on handled exceptions
})

// Stream for Morgan to pipe HTTP request logs to Winston
export const morganStream = {
	write: (message: string) => {
		// Use the http level, which will be captured since our level is 'debug'
		logger.http(message.trim())
	},
}

export default logger
