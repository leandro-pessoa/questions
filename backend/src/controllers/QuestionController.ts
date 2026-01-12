import QuestionService from '@/services/QuestionService'
import Controller from './Controller'
import type { IQuestion } from '@/types/IQuestion'
import type { Request, Response, NextFunction } from 'express'
import BadRequest from '@/errors/BadRequest'
import NotFound from '@/errors/NotFound'

const questionService = new QuestionService()

export default class QuestionController extends Controller<IQuestion> {
	constructor() {
		super(questionService)
	}

	async columnIndex(req: Request, res: Response, next: NextFunction) {
		const { selectedColumn } = req.body

		try {
			if (!selectedColumn || typeof selectedColumn !== 'string') {
				next(new BadRequest())
				return
			}

			const column = await questionService.getQuestionFilterColumn(selectedColumn)
			res.status(200).json(column)
		} catch (err) {
			next(err)
		}
	}

	async filteredQuestionsIndex(req: Request, res: Response, next: NextFunction) {
		const { subject, year, instituition, position, examiningBoard } = req.body

		try {
			const questions = await questionService.getFilteredQuestions(
				{subject, year, instituition, position, examiningBoard}
			)

			if (questions.length === 0) next(new NotFound('Questões inexistentes com esses filtros'))

			res.status(200).json(questions)
		} catch (err) {
			next(err)
		}
	}
}
