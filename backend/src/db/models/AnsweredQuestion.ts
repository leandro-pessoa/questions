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
	}
}, { timestamps: true })

export { answeredQuestionSchema }
