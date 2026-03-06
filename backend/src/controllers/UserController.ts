import UserService from '@/services/UserService'
import QuestionService from '@/services/QuestionService'
import Controller from './Controller'
import type { IUser } from '@/types/IUser'
import type { Request, Response, NextFunction } from 'express'
import BadRequest from '@/errors/BadRequest'
import NotFound from '@/errors/NotFound'

const userService = new UserService()
const questionService = new QuestionService()

export default class UserController extends Controller<IUser> {
	constructor() {
		super(userService)
	}

	// cria um novo usuário
	async userStore(req: Request, res: Response, next: NextFunction) {
		const { email } = req.body

		// retorna um erro 400 caso alguém tente criar um admin user
		if(req.body.role === 'admin') {
			next(new BadRequest())
			return
		}

		try {
			// verifica se o email já está cadastrado
			const emailExists = await userService.getOne({ email })

			// caso sim, retorna um erro de conflito
			if (emailExists) {
				next(new BadRequest('E-mail já cadastrado', 409))
				return
			}

			// adiciona o novo user e retorna ele
			const newValue = await userService.addOne(req.body)
			return res.status(201).json(newValue)
		} catch (err) {
			next(err)
		}
	}

	// lógica para realizar um login
	async login(req: Request, res: Response, next: NextFunction) {
		const invalidCredentials = new BadRequest('Credenciais inválidas', 401)
		const { email, password } = req.body

		// verifica se o email e senha foram enviados
		// caso não retorna um erro 401
		if (!email || !password) {
			next(invalidCredentials)
			return
		}

		try {
			// verifica se o user está cadastrado
			const user = await userService.getOne({ email })

			// caso não, retorna um erro 401
			if (!user) {
				next(invalidCredentials)
				return
			}

			// verifica o login por meio do service verifyLogin
			const token = await userService.verifyLogin(user, password)
			// retorna o token e alguns dados do user para serem utilizados no frontend
			res.status(200).json({
				token,
				user: {
					id: user._id,
					email: user.email,
					completeName: user.completeName,
				},
			})
		} catch (err) {
			next(err)
		}
	}

	// atualiza os dados de um usuário
	async userUpdate(req: Request, res: Response, next: NextFunction) {
		// obtém o id do user que está na requisição
		const id = req._id
		const { email } = req.body

		// retorna um erro 400 caso o user tente inserir a role de admin no user
		if(req.body.role === 'admin') {
			next(new BadRequest())
			return
		}

		try {
			// obtém o user
			const user = await userService.getById(id)
			// verifica se o email inserido no update já existe
			const emailExists = await userService.getOne({ email })

			// caso exista, retorna um erro de conflito
			if (emailExists) {
				next(new BadRequest('E-mail já cadastrado', 409))
				return
			}

			// caso o user exista
			if (user) {
				// atualiza o user com as informações enviadas
				await userService.updateOne(id, req.body)

				// obtém o novo user para o seu subsequente retorno na resposta
				const newUser = await userService.getById(id)
				if (newUser) {
					const { _id, completeName, email } = newUser
					res.status(200).json({ _id, completeName, email })
				}
			}

		} catch (err) {
			next(err)
		}
	}

	// atualiza o atributo de questões respondidas do user
	// adicionando ou alterando uma questão já respondida anteriormente
	async addAnsweredQuestion(req: Request, res: Response, next: NextFunction) {
		// obtém o id do user que está na requisição
		const id = req._id
		const { questionId, selectedOption } = req.body

		try {
			// obtém a questão que foi respondida
			const question = await questionService.getById(questionId)

			// caso não exista, retorna um erro 404
			if(!question) {
				next(new NotFound())
				return
			}

			// atualiza o user por meio do service answerQuestion
			await userService.answerQuestion(
				id, questionId, selectedOption, question.alternatives
			)

			// user atualizado para a resposta
			const newUser = await userService.getById(id)
			res.status(200).json(newUser)
		} catch(err) {
			next(err)
		}
	}

	async userDelete(req: Request, res: Response, next: NextFunction) {
		// obtém o id do user que está na requisição
		const id = req._id

		try {
			// obtém o user a ser removido
			const user = await userService.getById(id)

			// caso ele exista
			if (user) {
				// remove o user que está na requisição
				await userService.deleteOne(id)
				// retorna somente alguns dados do user na resposta
				const { _id, completeName, email } = user
				res.status(200).json({ _id, completeName, email })
			}

		} catch (err) {
			next(err)
		}
	}
}
