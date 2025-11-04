export interface IUser {
	_id: string
	role: string
	completeName: string
	email: string
	answeredQuestions?: string[]
	passwordHash: string
	password: string
}
