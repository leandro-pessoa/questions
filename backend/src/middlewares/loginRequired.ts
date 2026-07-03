import jwt from 'jsonwebtoken'

import BadRequest from '@/errors/BadRequest'
import BaseError from '@/errors/BaseError'
import UserService from '@/services/UserService'

import type { IUser } from '@/types/IUser'
import type { Request, Response, NextFunction } from 'express'

const userService = new UserService()

// middleware posicionado antes do controller para verificar se há algum user logado
export const loginRequired = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// busca a autorização no header
	// nesse caso será o bearer token
	const { authorization } = req.headers

	try {
		// caso a autorização não exista, retorna o erro 401
		if (!authorization) {
			next(new BadRequest('Login necessário', 401))
			return
		}

		// separa a palavra bearer do token
		const [, token] = authorization.split(' ')

		// caso o token não exista, retorna o erro 401
		if (!token) {
			next(new BadRequest('Login necessário', 401))
			return
		}

		// verifica se a variável de ambiente de configuração do token existe
		// caso não, retorna erro 500
		if (!process.env.TOKEN_SECRET) {
			console.error('Chave secreta do token inválida')
			next(new BaseError())
			return
		}

		// decodifica o token e retorna o user caso exista
		const user = jwt.verify(token, process.env.TOKEN_SECRET)

		const { _id, completeName, email, role } = user as IUser

		// verifica se o user existe
		// caso não, retorna um erro para cair no catch
		const userExists = await userService.getById(_id)
		if (!userExists) throw new Error()

		// insere os dados do user na requisição
		req._id = _id
		req.completeName = completeName
		req.email = email
		req.role = role

		// passa para o controller ou próximo elemento
		return next()
	} catch { // caso ocorra algum erro no try, irá retornar um erro 401
		next(new BadRequest('Token inválido ou expirado. Faça o login novamente', 401))
	}
}
