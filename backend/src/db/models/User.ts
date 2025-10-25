import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import type { IUser } from '@/types/IUser.js'

const userSchema = new Schema<IUser>({
	completeName: {
		type: String,
		required: [true, 'Nome completo obrigatório'],
		minLength: [3, 'O nome completo precisa ter pelo menos 3 caracteres'],
		maxLength: [60, 'O nome completo não pode ultrapassar 60 caracteres']
	},
	email: {
		type: String,
		require: [true, 'E-mail obrigatório'],
		validate: {
			validator: (value: string) => {return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)},
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
		type: String,
		required: [true, 'Senha obrigatória'],
		minLength: [6, 'A senha precisa ter pelo menos 6 caracteres'],
		maxLength: [30, 'A senha não pode ultrapassar 30 caracteres'],
		validate: {
			validator: (value: string) => {return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{1,}$/.test(value)},
			message: 'Senha muito fraca'
		},
		select: false
	}
})

userSchema.post('save', async (user) => {
	user.passwordHash = bcrypt.hashSync(user.password as string, 8)
})

const User = mongoose.model('User', userSchema)

export default User
