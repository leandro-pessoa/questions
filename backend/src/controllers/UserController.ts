import { UserService } from '@/services/UserService'
import Controller from './Controller'
import type { IUser } from '@/types/IUser'
import type { Request, Response, NextFunction } from 'express'
import BadRequest from '@/errors/BadRequest'
import NotFound from '@/errors/NotFound'

const userService = new UserService()

export default class UserController extends Controller<IUser> {
	constructor() {
		super(userService)
	}

	async userStore(req: Request, res: Response, next: NextFunction) {
		const { email } = req.body

		try {
			const emailExists = await userService.getOneByEmail(email)

			if (emailExists) {
				next(new BadRequest('E-mail já cadastrado', 409))
				return
			}

			const newValue = await userService.addOne(req.body)
			return res.status(201).json(newValue)
		} catch (err) {
			next(err)
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		const invalidCredentials = new BadRequest('Credenciais inválidas', 401)

		const { email, password } = req.body

		if (!email || !password) {
			next(invalidCredentials)
			return
		}

		const user = await userService.getOneByEmail(email)

		if (!user) {
			next(invalidCredentials)
			return
		}

		try {
			const token = await userService.verifyLogin(user, password)
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

	async userUpdate(req: Request, res: Response, next: NextFunction) {
		const id = req._id
		const { email } = req.body

		try {
			const user = await userService.getById(id)
			const emailExists = await userService.getOneByEmail(email)

			if (emailExists) {
				next(new BadRequest('E-mail já cadastrado', 409))
				return
			}

			if (user) {
				await userService.updateOne(id, req.body)
				const newUser = await userService.getById(id)
				if (newUser) {
					const { _id, completeName, email } = newUser
					res.status(200).json({ _id, completeName, email })
				}
			} else {
				next(new NotFound('Usuário não encontrado'))
			}
		} catch (err) {
			next(err)
		}
	}

	async userDelete(req: Request, res: Response, next: NextFunction) {
		const id = req._id

		try {
			const user = await userService.getById(id)

			if (user) {
				await userService.deleteOne(id)
				const { _id, completeName, email } = user
				res.status(200).json({ _id, completeName, email })
			} else {
				next(new NotFound('Usuário não encontrado'))
			}
		} catch (err) {
			next(err)
		}
	}
}
