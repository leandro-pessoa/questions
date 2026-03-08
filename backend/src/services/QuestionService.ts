import CRUDServices from './CRUDServices'
import type { IQuestion } from '@/types/IQuestion'
import Question from '@/db/models/Question'

export default class QuestionService extends CRUDServices<IQuestion> {
	constructor() {
		super(Question)
	}

	// obtém questões filtradas com base nos parâmetros passados na url
	// os parâmetros são os atributos filtráveis do model Question
	async getQuestionsWithFilters({
		subject,
		year,
		instituition,
		position,
		examiningBoard,
	}: Partial<{
		subject: string,
		year: string,
		instituition: string,
		position: string,
		examiningBoard: string
	}>) {
		// expressão que dá match com qualquer valor
		const anyValueRegexp = /\w/gi

		// ano atual
		const actualYear = new Date().getFullYear() + 1

		// intervalo padrão dos anos (todos os anos de 1990 até o ano atual)
		const yearInterval = Array.from({ length: (actualYear - 1990) }, (_, index) => 1990 + index)

		// transforma os filtros passados na url (string) em arrays
		const parseParamToArray = (param: string | undefined) => {
			if (!param) return ''
			return JSON.parse(param)
		}

		// aqui são listados todos os filtros possíveis para as questions
		// caso o filtro exista, ele será passado como um array contendo os valores passados na url
		// caso não, irá retornar um valor genérico para não interferir nos demais filtros
		const questionsFilters = {
			subject: { $in: parseParamToArray(subject) || anyValueRegexp },
			year: { $in: parseParamToArray(year) || yearInterval },
			instituition: { $in: parseParamToArray(instituition) || anyValueRegexp },
			position: { $in: parseParamToArray(position) || anyValueRegexp },
			examiningBoard: { $in: parseParamToArray(examiningBoard) || anyValueRegexp },
		}

		/*
			o retorno desse serviço será semelhante a isso:

			{
				subject: { '$in': /\w/gi },
				year: { '$in': [ '2025', '2026' ] },
				instituition: { '$in': [ 'NSEI' ] },
				position: { '$in': /\w/gi },
				examiningBoard: { '$in': /\w/gi }
			}

			esse objeto está no formato em que o mongoose/mongodb irá entender para filtrar os valores
		*/

		return questionsFilters
	}
}
