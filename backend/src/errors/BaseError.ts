import type { Response } from 'express'
import mongoose from 'mongoose'

export default class BaseError extends Error {
	constructor(
		public msg:
			| string
			| string[]
			| mongoose.Error.CastError = 'Erro interno do servidor',
		public status: number = 500,
	) {
		super()
	}

	sendResponse(res: Response) {
		res.status(this.status).json({
			status: this.status,
			message: this.message,
		})
	}
}
