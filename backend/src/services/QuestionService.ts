import CRUDServices from './CRUDServices.js'
import type { IQuestion } from '@/types/IQuestion.js'
import Question from '@/db/models/Question.js'

export default class QuestionService extends CRUDServices<IQuestion> {
	constructor() {
		super(Question)
	}
}
