import type { IUser } from '@/types/IUser.js'
import CRUDServices from './CRUDServices.js'
import User from '@/db/models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import BaseError from '@/errors/BaseError.js'
import BadRequest from '@/errors/BadRequest.js'

export class UserService extends CRUDServices<IUser> {
	constructor() {
		super(User)
	}

	async getOneByEmail(email: string) {
		return await User.findOne({ email })
	}

	async verifyLogin(user: IUser, password: string) {
		const verifyPassword = await bcrypt.compare(password ,user.passwordHash)

		if (verifyPassword) {
			const id = user._id
			const name = user.completeName
			const email = user.email

			const data = { id, name, email }
			const secretKey = process.env.TOKEN_SECRET
			if(secretKey) {
				const token = jwt.sign(data, secretKey, {expiresIn: '7d'})
				return token
			} else {
				console.error('Chave secreta do token inválida')
				throw new BaseError()
			}
		} else {
			throw new BadRequest('Credenciais inválidas', 401)
		}
}}
