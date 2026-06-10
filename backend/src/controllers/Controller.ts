import BadRequest from '@/errors/BadRequest'
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

	// faz uma pesquisa em um model
	// na query, é possível informar o valor a ser pesquisado e a coluna alvo
	async searchIndex(req: Request, res: Response, next: NextFunction) {
		const { searchValue, column } = req.query

		// caso não seja informado o valor ou a coluna
		if (!searchValue || !column) {
			next(new BadRequest())
			return
		}

		// caso a coluna selecionada seja referente a alguma senha
		if (column === 'password' || column === 'passwordHash') {
			next(new BadRequest())
			return
		}

		// caso os tipos informados do valor não sejam number ou string
		// caso o tipo de column não seja string
		if (
			(typeof searchValue !== 'string' && typeof searchValue !== 'number')
			|| typeof column !== 'string'
		) {
			next(new BadRequest())
			return
		}

		// regex para verificar se o valor é uma sequência de números
		const isNumber = searchValue.match(/^[0-9]{1,}$/)

		// objeto de pesquisa que será enviado para o find do model
		const searchObj: Record<string, RegExp | string> = {}

		// regex para o valor de pesquisa
		const searchRegex = new RegExp(searchValue, 'gi')

		// cria um atributo no objeto searchObj e atribui um valor a ele de acordo com o isNumber
		searchObj[column] = isNumber ? searchValue : searchRegex

		try {
			// faz a pesquisa utilizando o service getAll
			const result = await this.serviceEntity.getAll(searchObj)

			// caso o valor não seja encontrado
			if (result.length === 0) {
				next(new NotFound())
				return
			}

			return res.status(200).json(result)
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
