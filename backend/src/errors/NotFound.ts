import BadRequest from './BadRequest.js'

export default class NotFound extends BadRequest {
	constructor(msg = 'Valor não encontrado', status = 404) {
		super(msg, status)
	}
}
