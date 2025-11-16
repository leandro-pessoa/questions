import ValidationError from '@/errors/ValidationError'
import type { MongooseError } from 'mongoose'
import mongoose from 'mongoose'
import type { NextFunction, Request, Response } from 'express'
import BadRequest from '@/errors/BadRequest'
import BaseError from '@/errors/BaseError'
import NotFound from '@/errors/NotFound'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = (err: MongooseError, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof mongoose.Error.CastError) {
		new BadRequest().sendResponse(res)
	} else if (err instanceof mongoose.Error.ValidationError) {
		new ValidationError(err).sendResponse(res)
	} else if (err instanceof BadRequest) {
		err.sendResponse(res)
	} else if (err instanceof NotFound) {
		err.sendResponse(res)
	} else {
		new BaseError().sendResponse(res)
	}
	// console.log(err)
}

export default errors
