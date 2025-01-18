import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).send({ error: 'Token missing or invalid' })
	}

	const token = authHeader.split(' ')[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { iduser: number; username: string; name: string }
		req.user = decoded // Almacenar datos en req.user
		next()
	} catch (error) {
		return res.status(401).send({ error: 'Invalid token' })
	}
}
