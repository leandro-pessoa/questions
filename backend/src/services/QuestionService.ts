import CRUDServices from './CRUDServices'
import type { IQuestion } from '@/types/IQuestion'
import Question from '@/db/models/Question'

export default class QuestionService extends CRUDServices<IQuestion> {
	constructor() {
		super(Question)
	}

	async getQuestionFilterColumn(column: string) {
		const result = await super.getDistinctColumn(column)
		return result
	}

	async getFilteredQuestions({
		subject,
		year,
		instituition,
		position,
		examiningBoard,
	}: Partial<IQuestion>) {
		const anyValueRegexp = /\w/gi
		const actualYear = new Date().getFullYear() + 1
		const yearInterval = Array.from({ length: (actualYear - 1990) }, (_, index) => 1990 + index)

		const questions = await super.getAll({
			subject: { $in: subject || anyValueRegexp },
			year: { $in: year || yearInterval },
			instituition: { $in: instituition || anyValueRegexp },
			position: { $in: position || anyValueRegexp },
			examiningBoard: { $in: examiningBoard || anyValueRegexp },
		})

		return questions
	}
}
