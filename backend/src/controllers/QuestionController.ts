import QuestionService from '@/services/QuestionService.js'
import Controller from './Controller.js'
import type { IQuestion } from '@/types/IQuestion.js'

const questionService = new QuestionService()

export default class QuestionController extends Controller<IQuestion> {
	constructor() {
		super(questionService)
	}
}
