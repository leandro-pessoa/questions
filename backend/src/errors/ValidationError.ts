import BadRequest from './BadRequest'
import type mongoose from 'mongoose'

export default class ValidationError extends BadRequest {
	constructor(public err: mongoose.Error.ValidationError) {
		const errorMessage = Object.values(err.errors).map((err) => {
			return `${err.path}: ${err.message}`
        })
		super(errorMessage, 400)
	}
}
