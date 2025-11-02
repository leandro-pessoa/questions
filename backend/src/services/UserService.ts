import type { IUser } from '@/types/IUser.js'
import CRUDServices from './CRUDServices.js'
import User from '@/db/models/User.js'
import bcrypt from 'bcryptjs'

export class UserService extends CRUDServices<IUser> {
	constructor() {
		super(User)
	}

	async verifyLogin(user: IUser, password: string) {
		const verifyPassword = await bcrypt.compare(password ,user.passwordHash)

		if (verifyPassword) {
			const id = user._id
			const name = user.completeName
			const email = user.email
			const token = jwt.sign({ id, name, email }, process.env.TOKEN_SECRET, {
				expiresIn: process.env.TOKEN_EXPIRATION
			})
	}
}
