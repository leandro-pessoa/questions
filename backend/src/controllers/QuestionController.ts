import QuestionService from '@/services/QuestionService'
import Controller from './Controller'
import type { IQuestion } from '@/types/IQuestion'
import type { Request, Response, NextFunction } from 'express'
import BadRequest from '@/errors/BadRequest'

const questionService = new QuestionService()

export default class QuestionController extends Controller<IQuestion> {
	constructor() {
		super(questionService)
	}

	async columnIndex(req: Request, res: Response, next: NextFunction) {
		const { selectedColumn } = req.query

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

	async index(req: Request, res: Response, next: NextFunction) {
		// query = {subject, year, instituition, position, examiningBoard}
		const query = req.query

		try {
			const filters = await questionService.getQuestionsWithFilters(query)

			req.paginationModel = this.serviceEntity.model
			req.paginationFilters = filters

			next()
		} catch (err) {
			next(err)
		}
	}
}
