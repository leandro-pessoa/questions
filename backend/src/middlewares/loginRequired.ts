import User from '@/db/models/User'
import BadRequest from '@/errors/BadRequest'
import BaseError from '@/errors/BaseError'
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const loginRequired = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { authorization } = req.headers

	try {
		if (!authorization) {
			next(new BadRequest('Login necessário', 401))
			return
		}

		const [, token] = authorization.split(' ')
		if (!token) {
			next(new BadRequest('Login necessário', 401))
			return
		}

		if (!process.env.TOKEN_SECRET) {
			console.error('Chave secreta do token inválida')
			next(new BaseError())
			return
		}

		const data = jwt.verify(token, process.env.TOKEN_SECRET)

		// ensure payload is an object and contains _id at runtime so TS can safely access it
		if (
			typeof data === 'string' ||
			data === null ||
			typeof data !== 'object' ||
			!('_id' in data)
		) {
			next(new BadRequest('Login necessário', 401))
			return
		}

		const user = await User.findOne({ _id: (data as { _id: string })._id })

		if (!user) {
			next(new BadRequest('Usuário inválido'))
			return
		}

		const { _id, completeName, email } = user

		req._id = _id
		req.completeName = completeName
		req.email = email

		return next()
	} catch {
		next(new BadRequest('Token inválido ou expirado. Faça o login novamente', 401))
	}
}
