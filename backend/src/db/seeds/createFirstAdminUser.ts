import 'dotenv/config'
import UserService from '@/services/UserService'
import { connectDatabase } from '../connectDatabase'
import mongoose from 'mongoose'

const userService = new UserService()

export const createFirstAdminUser = async () => {
	try {
		await connectDatabase()

		// lista todos os usuários que são admins
		const existentAdmins = await userService.getAll({ role: 'admin' })

		// verifica se existe algum usuário admin
		if (existentAdmins.length === 0) {
			// se não, cria um user admin novo
			await userService.addOne({
				role: 'admin',
				completeName: process.env.APP_ADMIN_NAME,
				email: process.env.APP_ADMIN_EMAIL,
				password: process.env.APP_ADMIN_PASS
			})
		}
	} catch (err) {
		console.log('Seeding failed: ', err)
	} finally {
		await mongoose.connection.close()
	}
}

createFirstAdminUser()
