import mongoose from 'mongoose'

const { Schema } = mongoose

const fullYear = new Date().getFullYear()

const questionSchema = new Schema({
	subject: {
		type: String,
		required: [true, 'Disciplina da questão é obrigatória'],
		minLength: [3, 'O enunciado deve ter no mínimo 3 caracteres'],
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
	test: {
		type: String,
		minLength: [4, 'A prova deve ter no mínimo 4 caracteres'],
		maxLength: [30, 'A prova deve ter no máximo 30 caracteres'],
	}
})

const Question = mongoose.model('Question', questionSchema)

export default Question
