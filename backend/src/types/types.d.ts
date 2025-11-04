declare namespace Express {
	export interface Request {
		_id: string
		completeName: string
		email: string
	}

	export interface Response {
		_id: string
		completeName: string
		email: string
	}
}
