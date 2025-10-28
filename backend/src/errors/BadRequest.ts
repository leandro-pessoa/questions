import BaseError from './BaseError.js'
import mongoose from 'mongoose'

export default class BadRequest extends BaseError {
	constructor(
		msg:
			| string
			| string[]
			| mongoose.Error.CastError = 'Requisição incorreta',
		status = 400,
	) {
		super(msg, status)
	}
}
