import mongoose, { Schema } from 'mongoose'
import { verifyWhiteSpaces } from '@/utils/verifyWhiteSpaces'

import type { IQuestion } from '@/types/IQuestion'
import type { IAlternative } from '@/types/IAlternative'

// obtém o ano atual
const fullYear = new Date().getFullYear()

// regexp para verificar se há espaços vazios em uma string
const alternativeRegexp = /^[^\s]+(?:$|.*[^\s]+$)/

const questionSchema = new Schema<IQuestion>({
	subject: {
		type: String,
		required: [true, 'Disciplina da questão é obrigatória'],
		minLength: [2, 'A disciplina deve ter no mínimo 2 caracteres'],
		maxLength: [40, 'A disciplina deve ter no máximo 40 caracteres'],
		validate: verifyWhiteSpaces('Disciplina'),
	},
	statement: {
		type: String,
		required: [true, 'Enunciado da questão é obrigatório'],
		minLength: [10, 'O enunciado deve ter no mínimo 10 caracteres'],
		maxLength: [1000, 'O enunciado deve ter no máximo 1000 caracteres'],
	},
	year: {
		type: Number,
		min: [1900, 'O ano não pode ser inferior a 1900'],
		max: [fullYear, `O ano não pode ser superior a ${fullYear}`],
	},
	instituition: {
		type: String,
		minLength: [2, 'A organização deve ter no mínimo 2 caracteres'],
		maxLength: [30, 'A organização deve ter no máximo 20 caracteres'],
		validate: verifyWhiteSpaces('Organização'),
	},
	position: {
		type: String,
		minLength: [4, 'O cargo deve ter no mínimo 4 caracteres'],
		maxLength: [30, 'O cargo deve ter no máximo 30 caracteres'],
		validate: verifyWhiteSpaces('Cargo'),
	},
	examiningBoard: {
		type: String,
		minLength: [2, 'A banca deve ter no mínimo 2 caracteres'],
		maxLength: [30, 'A banca deve ter no máximo 15 caracteres'],
		validate: verifyWhiteSpaces('Banca examinadora'),
	},
	alternatives: {
		type: [{
			right: Boolean,
			text: String,
			letter: String,
		}],
		validate: [
			{
				validator: (value: IAlternative[]) => {return !(value.length > 5 || value.length < 2)},
				message: 'Quantidade de alternativas inválida (min: 2, max: 5)'
			},
			{
				validator: (value: IAlternative[]) => {return value.every(alternative => alternative.text.length >= 1)},
				message: 'Cada alternativa deve ter no mínimo 1 caractere'
			},
			{
				validator: (value: IAlternative[]) => {return value.every(alternative => alternative.text.length <= 100)},
				message: 'Cada alternativa deve ter no máximo 100 caracteres'
			},
			{
				validator: (value: IAlternative[]) => {return value.some(alternative => alternative.right)},
				message: 'Deve haver uma alternativa correta'
			},
			{
				validator: (value: IAlternative[]) => {return !(value.filter(alternative => alternative.right).length > 1)},
				message: 'Não pode haver mais de uma alternativa correta'
			},
			{
				validator: (value: IAlternative[]) => {
					return value.every(
						alternative =>
							alternative.letter.match(/^[A|B|C|D|E]{1}$/g)
					)
				},
				message: 'A letra de cada alternativa deve ser: A, B, C, D ou E'
			},
			{
				validator: (value: IAlternative[]) => {
					return value.every((alternative) => alternative.letter.match(alternativeRegexp) && alternative.text.match(alternativeRegexp))
				},
				message: 'Espaços vazios inválidos no campo Alternativa'
			}
		],
	}
})

const Question = mongoose.model('Question', questionSchema)

export default Question
