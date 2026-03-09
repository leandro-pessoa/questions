import NotFound from '@/errors/NotFound'
import CRUDServices from '@/services/CRUDServices'
import type { Request, Response, NextFunction } from 'express'

// controller genérico
// todos os outros controllers irão herdar dele seus métodos
export default class Controller<T> {
	constructor(public serviceEntity: CRUDServices<T>) {}

	// define o model na requisição e passa para o middleware de paginação
	// que irá retornar todos os elementos de um model
	async index(req: Request, res: Response, next: NextFunction) {
		try {
			req.paginationModel = this.serviceEntity.model

			next()
		} catch (err) {
			next(err)
		}
	}

	// retorna um único elemento de um módel, baseado pelo id
	async show(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params

		try {
			// obtém o documento pelo id
			const value = await this.serviceEntity.getById(id as string)

			if (value) { // retorna na resposta
				return res.status(200).json(value)
			} else { // retorna o erro 404 caso não encontre
				next(new NotFound())
			}
		} catch (err) {
			next(err)
		}
	}

	// armazena um documento no banco de dados
	async store(req: Request, res: Response, next: NextFunction) {
		try {
			const newValue = await this.serviceEntity.addOne(req.body)
			return res.status(201).json(newValue)
		} catch (err) {
			next(err)
		}
	}

	// atualiza um documento do banco de dados, encontrando-o pelo id
	async update(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params

		try {
			const value = await this.serviceEntity.getById(id as string)
			if (value) { // atualiza o documento e retorna ele na resposta
				await this.serviceEntity.updateOne(id as string, req.body)
				const updatedValue = await this.serviceEntity.getById(id as string)
				return res.status(200).json(updatedValue)
			} else { // retorna o erro 404 caso não encontre
				next(new NotFound())
			}

		} catch (err) {
			next(err)
		}
	}

	// remove um documento do banco de dados com base no id
	async delete(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params

		try {
			const value = await this.serviceEntity.getById(id as string)
			if (value) { // remove o valor e retorna ele na resposta
				await this.serviceEntity.deleteOne(id as string)
				return res.status(200).json(value)
			} else { // retorna um erro 404
				next(new NotFound())
			}
		} catch (err) {
			next(err)
		}
	}
}
