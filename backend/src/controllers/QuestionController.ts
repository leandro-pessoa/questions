import QuestionService from '@/services/QuestionService'
import Controller from './Controller'
import BadRequest from '@/errors/BadRequest'

import type { IQuestion } from '@/types/IQuestion'
import type { Request, Response, NextFunction } from 'express'

const questionService = new QuestionService()

export default class QuestionController extends Controller<IQuestion> {
	constructor() {
		super(questionService)
	}

	// retorna os valores do service getDistinctColumn
	async columnIndex(req: Request, res: Response, next: NextFunction) {
		const { selectedColumn } = req.query

		try {
			// caso a coluna não seja informada na query ou o valor não seja uma string
			// retorna um erro 400
			if (!selectedColumn || typeof selectedColumn !== 'string') {
				next(new BadRequest())
				return
			}

			// resultado do service getDistinctColumn e o envio da resposta
			const column = await questionService.getDistinctColumn(selectedColumn)
			res.status(200).json(column)
		} catch (err) {
			next(err)
		}
	}

	// irá retornar as questões, com ou sem filtros
	// com base no service getQuestionsWithFilters
	async index(req: Request, res: Response, next: NextFunction) {
		// query = {subject?, year?, instituition?, position?, examiningBoard?}
		const query = req.query

		try {
			// retorno do service getQuestionsWithFilters
			const filters = await questionService.getQuestionsWithFilters(query)

			// repassa o model Questions para a requisição
			req.paginationModel = this.serviceEntity.model

			// repassa os filtros informados para a requisição
			req.paginationFilters = filters

			// continua no middleware pagination
			next()
		} catch (err) {
			next(err)
		}
	}
}
