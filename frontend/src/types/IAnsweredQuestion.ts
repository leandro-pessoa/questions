export interface IAnsweredQuestion {
	questionId: string
	selectedOption: string
	correctOption: string
	isCorrectAnswer: boolean
	createdAt: Date,
	updatedAt: Date
}
