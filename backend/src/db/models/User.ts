import mongoose, { Schema, VirtualType } from 'mongoose'
import bcrypt from 'bcryptjs'
import type { IUser } from '@/types/IUser.js'

const userSchema = new Schema<IUser>({
	completeName: {
		type: String,
		require: [true, 'Nome completo obrigatório'],
		minLength: [3, 'O nome completo precisa ter pelo menos 3 caracteres'],
		maxLength: [10, 'O nome completo não pode ultrapassar 30 caracteres']
	},
	email: {
		type: String,
		require: [true, 'E-mail obrigatório'],
		validate: {
			validator: (value: string) => {return !(value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/))},
			message: 'E-mail inválido'
		}
	},
	answeredQuestions: {
		type: [String]
	},
	passwordHash: {
		type: String
	},
	password: {
		type: VirtualType,
		require: [true, 'Senha obrigatória'],
		minLength: [6, 'O nome completo precisa ter pelo menos 6 caracteres'],
		maxLength: [30, 'O nome completo não pode ultrapassar 30 caracteres'],
		validate: {
			validator: (value: string) => {return !(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{1,}$/))},
			message: 'Senha muito fraca'
		},
	}
})

userSchema.post('save', async (user) => {
	user.passwordHash = bcrypt.hashSync(user.password as string, 8)
})

const User = mongoose.model('User', userSchema)

export default User
