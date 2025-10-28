import ValidationError from '@/errors/ValidationError.js'
import type { MongooseError } from 'mongoose'
import mongoose from 'mongoose'
import type { Response } from 'express'
import BadRequest from '@/errors/BadRequest.js'
import NotFound from '@/errors/NotFound.js'
import BaseError from '@/errors/BaseError.js'

const errors = (err: MongooseError, res: Response) => {
	if (err instanceof mongoose.Error.CastError) {
		new BadRequest(err).sendResponse(res)
	} else if (err instanceof mongoose.Error.ValidationError) {
		new ValidationError(err).sendResponse(res)
	} else if (err instanceof NotFound) {
		new NotFound(err).sendResponse(res)
	} else {
		new BaseError(err).sendResponse(res)
	}
}

export default errors
