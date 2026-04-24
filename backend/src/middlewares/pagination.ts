import BadRequest from '@/errors/BadRequest'
import NotFound from '@/errors/NotFound'

import type { Request, Response, NextFunction } from 'express'

// traz uma resposta com o resultado da requisição paginado
// com base na query, o limite, a ordem e a página podem ser enviados para mudar a resposta
export const pagination = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// parâmetros da requisição
		let { limit = 10, page = 1, order = 1 } = req.query

		// busca o model e os filtros na requisição
		const model = req.paginationModel
		const filters = req.paginationFilters

		// converte os parâmetros em número
		limit = Number(limit)
        page = Number(page)
		order = Number(order)

		if ( // faz a verificação dos tipos e valores dos parâmetros
			typeof limit !== 'number' ||
			typeof page !== 'number' ||
			order !== 1 && order !== -1
		) { // retorna um erro 400 caso algum esteja incorreto
			next(new BadRequest())
			return
		}

		// caso o limite e a página sejam maiores do que 1
		if (limit > 0 && page > 0) {
			// total de valores da busca do banco de dados
			const totalValues = await model.countDocuments(filters || null)

			// total de páginas
			const totalPages = Math.ceil(totalValues / limit)

			// busca no banco de dados
			const pageResult = await model
				.find(filters || {}) // insere os filtros caso existam
				.sort({ _id: order }) // ordena com base no parâmetro order (1: mais antigo para o mais novo, -1: mais novo para o mais antigo)
				.skip((page - 1) * limit) // método para criar a paginação
				.limit(limit) // limite de documentos por página
				.select('-__v') // remove a versionKey das queries

			// caso o pageResult não tenha nada, irá retornar um erro 404
			if (pageResult.length === 0) next(new NotFound('Não foram encontrados resultados'))

			// a resposta retorna
			// resultado da busca
			// total de páginas
			// total de valores
			// página atual
			// limite de valores por página
			res.status(200).json({ pageResult, totalPages, totalValues, actualPage: page, limit })
		} else { // retorna um erro 400
			next(new BadRequest())
		}
	} catch (err) {
		next(err)
	}
}
