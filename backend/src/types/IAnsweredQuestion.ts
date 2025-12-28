import type { IAlternative } from "./IAlternative"

export interface IAnsweredQuestion {
	questionId: string
	selectedOption: IAlternative
	isCorrectAnswer: boolean
}
