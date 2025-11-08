import BaseError from './BaseError'

export default class BadRequest extends BaseError {
	constructor(
		msg:
			| string
			| string[] = 'Requisição inválida',
		status = 400,
	) {
		super(msg, status)
	}
}
