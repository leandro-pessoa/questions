import ValidationError from '@/errors/ValidationError.js'
import type { MongooseError } from 'mongoose'
import mongoose from 'mongoose'
import type { NextFunction, Request, Response } from 'express'
import BadRequest from '@/errors/BadRequest.js'
import BaseError from '@/errors/BaseError.js'
import NotFound from '@/errors/NotFound.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = (err: MongooseError, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof mongoose.Error.CastError) {
		new BadRequest().sendResponse(res)
	} else if (err instanceof mongoose.Error.ValidationError) {
		new ValidationError(err).sendResponse(res)
	} else if (err instanceof NotFound) {
		new NotFound().sendResponse(res)
	} else {
		new BaseError().sendResponse(res)
	}
	console.log(err)
}

export default errors
