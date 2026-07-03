import jwt from 'jsonwebtoken'

import ValidationError from '@/errors/ValidationError'
import mongoose from 'mongoose'
import BadRequest from '@/errors/BadRequest'
import BaseError from '@/errors/BaseError'
import NotFound from '@/errors/NotFound'

import type { MongooseError } from 'mongoose'
import type { NextFunction, Request, Response } from 'express'

// verifica o erro que recebe no parâmetro e lança uma resposta de acordo com o erro
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = (err: MongooseError, req: Request, res: Response, next: NextFunction) => {
	// requisições inválidas para o mongoose
	if (err instanceof mongoose.Error.CastError) {
		new BadRequest().sendResponse(res)
	} else if (err instanceof mongoose.Error.ValidationError) { // erros de validação dos models
		new ValidationError(err).sendResponse(res)
	} else if (err instanceof jwt.JsonWebTokenError) { // erro do jsonwebtoken
		new BadRequest('Token expirado ou inválido', 401).sendResponse(res)
	} else if (err instanceof NotFound) { // not found
		err.sendResponse(res)
	} else if (err instanceof BadRequest) { // bad request
		err.sendResponse(res)
	} else { // erro genérico (500) caso não se enquadre em nenhum outro
		new BaseError().sendResponse(res)
	}
	// console.log(err)
}

export default errors
