declare namespace Express {
	export interface Request {
		_id: string
		role: 'default' | 'admin'
		completeName: string
		email: string
	}

	export interface Response {
		_id: string
		role: 'default' | 'admin'
		completeName: string
		email: string
	}
}
