import mongoose, { Schema } from 'mongoose'
import type { IQuestion } from '@/types/IQuestion.js'

const fullYear = new Date().getFullYear()

const questionSchema = new Schema<IQuestion>({
	subject: {
		type: String,
		required: [true, 'Disciplina da questão é obrigatória'],
		minLength: [2, 'O enunciado deve ter no mínimo 2 caracteres'],
		maxLength: [20, 'O enunciado deve ter no máximo 20 caracteres'],
	},
	statement: {
		type: String,
		required: [true, 'Enunciado da questão é obrigatório'],
		minLength: [10, 'O enunciado deve ter no mínimo 10 caracteres'],
		maxLength: [500, 'O enunciado deve ter no máximo 500 caracteres'],
	},
	year: {
		type: Number,
		min: [1900, 'O ano não pode ser inferior a 1900'],
		max: [fullYear, `O ano não pode ser superior a ${fullYear}`]
	},
	instituition: {
		type: String,
		minLength: [2, 'A organização deve ter no mínimo 2 caracteres'],
		maxLength: [30, 'A organização deve ter no máximo 20 caracteres'],
	},
	position: {
		type: String,
		minLength: [4, 'O cargo deve ter no mínimo 4 caracteres'],
		maxLength: [30, 'O cargo deve ter no máximo 30 caracteres'],
	},
	examiningBoard: {
		type: String,
		minLength: [2, 'A banca deve ter no mínimo 2 caracteres'],
		maxLength: [30, 'A banca deve ter no máximo 15 caracteres'],
	},
	wrongAlternatives: {
		type: [String],
		validate: {
			validator: (value: string[]) => {return !(value.length > 4 || value.length < 1)},
			message: 'Quantidade de alternativas inválida (min: 1, max: 4) foi:'
		},
		minLength: [1, 'Cada alternativa deve ter no mínimo 1 caractere'],
		maxLength: [100, 'Cada alternativa deve ter no máximo 100 caracteres'],
	},
	rightAlternative: {
		type: String,
		require: [true, 'Alternativa correta obrigatória'],
		minLength: [1, 'A alternativa deve ter no mínimo 1 caractere'],
		maxLength: [100, 'A alternativa deve ter no máximo 100 caracteres'],
	}
})

const Question = mongoose.model('Question', questionSchema)

export default Question
