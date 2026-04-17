import { Schema } from 'mongoose'

import type { IAnsweredQuestion } from '@/types/IAnsweredQuestion'

const answeredQuestionSchema = new Schema<IAnsweredQuestion>({
	questionId: {
		type: String,
		required: true
	},
	selectedOption: {
		right: {
			type: Boolean,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		letter: {
			type: String,
			required: true
		}
	},
	isCorrectAnswer: {
		type: Boolean,
		required: true
	},
	updatedAt: {
		type: Date,
		default: new Date(Date.now() - 10800000) // - 3horas (fuso horário de São Paulo)
	}
}, {timestamps: false})

export { answeredQuestionSchema }
