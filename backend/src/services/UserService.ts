import CRUDServices from './CRUDServices'
import User from '@/db/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import BaseError from '@/errors/BaseError'
import BadRequest from '@/errors/BadRequest'
import NotFound from '@/errors/NotFound'
import LoginLimiter from '@/db/models/LoginLimiter'

import type { IUser } from '@/types/IUser'
import type { IAlternative } from '@/types/IAlternative'

export default class UserService extends CRUDServices<IUser> {
	constructor() {
		super(User)
	}

	// verifica se as credenciais de login estão corretas
	// parâmetros:
	// user que está fazendo o login
	// senha informada
	async verifyLogin(user: IUser, password: string) {
		// compara a senha enviada com o hash armazenado no banco de dados
		// retorna true ou false
		const verifyPassword = await bcrypt.compare(password ,user.passwordHash)

		// caso a senha seja a correta
		if (verifyPassword) {
			// dados do user informado no parâmetro
			const _id = user._id
			const completeName = user.completeName
			const email = user.email
			const role = user.role

			// dados que estarão embutidos no token
			const data = { _id, completeName, email, role }

			// chave secreta (criada no .env)
			const secretKey = process.env.TOKEN_SECRET

			// verifica se a chave existe
			if(secretKey) {
				// realiza a criação do token, com expiração de 7 dias
				const token = jwt.sign(data, secretKey, {expiresIn: '7d'})

				const limiter = await LoginLimiter.findOne({ email })

				// verifica se a quantidade máxima de tentativas foi atingida
				if (limiter && limiter.count >= 5) {
					// caso sim, não permite o user realizar o login
					// mesmo que a senha esteja correta
					throw new BadRequest('Quantidade máxima de tentativas excedidas. Aguarde 5 minutos', 401)
				}

				// retorna o token
				return token
			} else { // caso não exista, exite um erro no terminal e retona um erro 500
				console.error('Chave secreta do token inválida')
				throw new BaseError()
			}
		} else { // caso a senha seja incorreta, retorna o erro 401
			throw new BadRequest('Credenciais inválidas', 401)
		}
	}

	// armazena ou altera uma resposta de questão no user
	// a manipulação dessas questões é baseada na manipulação de arrays no mongodb
	// parâmetros:
	// identificador do user
	// id da questão respondida
	// opção da questão selecionada
	// alternativas da questão
	async answerQuestion(
		userId: string,
		questionId: string,
		selectedOption: IAlternative,
		alternatives: IAlternative[]
	) {
		// verifica se os parâmetros foram informados
		// no caso das alternativas, checa se a alternativa selecionada está entre as alternativas informadas
		if (
			!userId ||
			!questionId ||
			!selectedOption ||
			!alternatives.some((alternative) => alternative.text === selectedOption.text)
		) { // caso não, retorna um erro 400
			throw new BadRequest()
		}

		// verifica se o user existe
		const user = await User.findById(userId)

		// caso não exista, retorna um erro 404
		if (!user) {
			throw new NotFound('Usuário não encontrado')
		}

		// verifica se a questão já foi respondida anteriormente
		// busca a questão atual no banco de questões dos usuários
		const isAlreadyAnswered =
			user.answeredQuestions?.find(
				(value) => value.questionId === questionId
			)

		// caso ainda não foi respondida
		if(!isAlreadyAnswered) {
			// atualiza o usuário inserindo a nova questão respondida
			await User.updateOne(
				{ _id: userId }, // id do user
				{	// adiciona a questão no atributo answeredQuestions do user
					$push: {
						answeredQuestions: {
							questionId,
							selectedOption,
							isCorrectAnswer: selectedOption.right
						}
					}
				})
		} else { // caso já foi respondida
			// atualiza a questão que já foi respondida com os novos dados
			await User.updateOne(
				{ 'answeredQuestions.questionId': questionId }, // recebe o id da questão
				{	// altera os dados da questão respondida
					// utiliza o operador posicional filtrado
					$set: {
						'answeredQuestions.$.questionId': questionId,
						'answeredQuestions.$.selectedOption': selectedOption,
						'answeredQuestions.$.isCorrectAnswer': selectedOption.right
					}
				},
				{	// identificador para achar a questão específica a ser alterada
					arrayFilters: [{'answeredQuestion.questionId': questionId}]
				}
			)
		 }
	}

	// irá limitar a quantidade de tentativas que um usuário pode fazer o login
	// adiciona no contador cada vez que tentar realizar o login e falhar (verficado no controller)
	// parâmetros:
	// email do user que está tentando realizar o login
	async loginLimiter(email: IUser['email']) {
		// encontra o documento na base de dados
		// ele expira em 5 minutos
		const limiter = await LoginLimiter.findOne({ email })

		// caso já exista
		if (limiter) { // verifica se a contagem já chegou no limite
			if (limiter.count >= 5) { // lança um erro caso sim
				throw new BadRequest('Quantidade máxima de tentativas excedidas. Aguarde 5 minutos', 401)
			}

			// caso não, adiciona um na contagem
			await LoginLimiter.updateOne({ email }, { count: limiter.count += 1})
			return
		}

		// caso não exista, irá criar um novo documento
		await LoginLimiter.create({ email, count: 1 })
	}

	// obtém o número de questões respondidas do dia atual e dos 6 anteriores
	// o retorno será um array em que cada elemento corresponderá a quantidade de questões respondidas no dia (ex: [0, 2, 5, 10, 1, 2, 9])
	// parâmetros:
	// usuário
	async getWeeklyAnsweredQuestions(user: IUser) {
		// um dia em milisegundos para facilitar o cálculo dos dias
		const dayInMilliseconds = 86400000

		// constantes para datas
		const date = new Date()
		const time = date.getTime() // data atual em milisegundos

		// irá obter a data do dia atual e dos 6 anteriores em milisegundos
		const recentDays = [
			time - dayInMilliseconds * 6,
			time - dayInMilliseconds * 5,
			time - dayInMilliseconds * 4,
			time - dayInMilliseconds * 3,
			time - dayInMilliseconds * 2,
			time - dayInMilliseconds,
			time,
		]

		// array que será retornado
		const data: number[] = []

		// para cada data do array recentDays, irá filtrar as questões do user em que o updatedAt coincida com a data e irá guardar a lenght no array data
		recentDays.forEach((day) => {
			// data do dia da semana em isostring (ex: 2026-04-04)
			const isoDate = new Date(day).toISOString().slice(0, 10)

			// filtra as questões respondidas do user de acordo com a data do loop
			const equalDateQuestions = user.answeredQuestions?.filter((question) => {
				// data do updatedAt de cada questão em isostring (ex: 2026-04-04)
				const questionUpdateDate = question.updatedAt.toISOString().slice(0, 10)

				// verifica se as datas coincidem
				if (questionUpdateDate === isoDate) { // caso sim, guarda no array de retorno do filter
					return question
				}
			})

			// armazena a length do equalDateQuestions para cada dia de recentDays
			// caso não tenha nenhum valor, armazena um zero
			data.push(equalDateQuestions?.length || 0)
		})

		return data
	}
}
