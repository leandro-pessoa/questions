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

	async getQuestionsWithFilters({
		subject,
		year,
		instituition,
		position,
		examiningBoard,
	}: Partial<{
		subject: string,
		year: string,
		instituition: string,
		position: string,
		examiningBoard: string
	}>) {
		const anyValueRegexp = /\w/gi
		const actualYear = new Date().getFullYear() + 1
		const yearInterval = Array.from({ length: (actualYear - 1990) }, (_, index) => 1990 + index)

		const parseParamToArray = (param: string | undefined) => {
			if (!param) return ''
			return JSON.parse(param)
		}

		const questionsFilters = {
			subject: { $in: parseParamToArray(subject) || anyValueRegexp },
			year: { $in: parseParamToArray(year) || yearInterval },
			instituition: { $in: parseParamToArray(instituition) || anyValueRegexp },
			position: { $in: parseParamToArray(position) || anyValueRegexp },
			examiningBoard: { $in: parseParamToArray(examiningBoard) || anyValueRegexp },
		}

		return questionsFilters
	}
}
