import CRUDServices from './CRUDServices'
import type { IQuestion } from '@/types/IQuestion'
import Question from '@/db/models/Question'

export default class QuestionService extends CRUDServices<IQuestion> {
	constructor() {
		super(Question)
	}
}
