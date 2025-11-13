export interface IUser {
	_id: string
	role: 'default' | 'admin'
	completeName: string
	email: string
	answeredQuestions?: string[]
	passwordHash: string
	password: string
}
