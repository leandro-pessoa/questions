import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import type { IUser } from '@/types/IUser'

const userSchema = new Schema<IUser>({
	role: {
		type: String,
		enum: {
			values: ['default', 'admin'],
			message: '{VALUE} não é aceito. (default ou admin)'
		},
		default: 'default'
	},
	completeName: {
		type: String,
		required: [true, 'Nome completo obrigatório'],
		minLength: [3, 'O nome completo precisa ter pelo menos 3 caracteres'],
		maxLength: [60, 'O nome completo não pode ultrapassar 60 caracteres'],
	},
	email: {
		type: String,
		required: [true, 'E-mail obrigatório'],
		validate: {
			validator: (value: string) => {
				return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
			},
			message: 'E-mail inválido',
		},
	},
	answeredQuestions: [{
		questionId: String,
		selectedOption: {
			right: Boolean,
			text: String,
			letter: String,
		},
		isCorrectAnswer: Boolean
	}],
	passwordHash: {
		type: String,
	},
	password: {
		type: String,
		required: [true, 'Senha obrigatória'],
		minLength: [6, 'A senha precisa ter pelo menos 6 caracteres'],
		maxLength: [30, 'A senha não pode ultrapassar 30 caracteres'],
		validate: {
			validator: (value: string) => {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{1,}$/.test(
					value,
				)
			},
			message: 'Senha muito fraca',
		},
		select: false
	},
})

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt(8)
		this.passwordHash = await bcrypt.hash(this.password as string, salt)
	}
	next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
	const { password } = this.getUpdate() as Partial<IUser>
	const { _id } = this.getQuery()
	if(password) {
		const salt = await bcrypt.genSalt(8)
		const newPasswordHash = await bcrypt.hash(password as string, salt)
		await this.model.findByIdAndUpdate(_id, { passwordHash: newPasswordHash })
	}
	next()
})

const User = mongoose.model('User', userSchema)

export default User
