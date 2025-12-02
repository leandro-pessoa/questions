import type { IAnsweredQuestion } from "./IAnsweredQuestion"

export interface IUser {
	_id: string
	role: 'default' | 'admin'
	completeName: string
	email: string
	answeredQuestions?: IAnsweredQuestion[]
	passwordHash: string
	password: string
}
