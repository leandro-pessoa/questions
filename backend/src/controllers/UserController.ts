import { UserService } from '@/services/UserService.js'
import Controller from './Controller.js'
import type { IUser } from '@/types/IUser.js'
import type { Request, Response, NextFunction } from 'express'
import BadRequest from '@/errors/BadRequest.js'

const userService = new UserService()

export default class UserController extends Controller<IUser> {
	constructor() {
		super(userService)
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
}
