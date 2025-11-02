export interface IUser {
	_id: string
	completeName: string
	email: string
	answeredQuestions?: string
	passwordHash: string
	password: string
}
