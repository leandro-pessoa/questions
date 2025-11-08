import QuestionService from '@/services/QuestionService'
import Controller from './Controller'
import type { IQuestion } from '@/types/IQuestion'

const questionService = new QuestionService()

export default class QuestionController extends Controller<IQuestion> {
	constructor() {
		super(questionService)
	}
}
