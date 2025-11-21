import User from '@/db/models/User'
import BadRequest from '@/errors/BadRequest'
import BaseError from '@/errors/BaseError'
import type { IUser } from '@/types/IUser'
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
			console.log('authorization')
			next(new BadRequest('Login necessário', 401))
			return
		}

		const [, token] = authorization.split(' ')
		if (!token) {
			console.log('token')
			next(new BadRequest('Login necessário', 401))
			return
		}

		if (!process.env.TOKEN_SECRET) {
			console.error('Chave secreta do token inválida')
			next(new BaseError())
			return
		}

		const data = jwt.verify(token, process.env.TOKEN_SECRET)

		const user = await User.findOne({ _id: (data as { _id: string })._id })

		const { _id, completeName, email, role } = user as IUser

		req._id = _id
		req.completeName = completeName
		req.email = email
		req.role = role

		return next()
	} catch {
		next(new BadRequest('Token inválido ou expirado. Faça o login novamente', 401))
	}
}
