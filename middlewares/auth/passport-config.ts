import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import prisma from '../../prisma/prisma'
import * as dotenv from 'dotenv'
dotenv.config()

if (!process.env.JWT_SECRET) {
	throw new Error('JWT_SECRET is not defined in the environmet variables')
}

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
}

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: { idUser: jwt_payload.idUser },
			})
			return done(null, user ? user : false)
		} catch (error) {
			done(error, false)
		}
	}),
)

export default passport
