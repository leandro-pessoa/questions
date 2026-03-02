import type { IToken } from '@/types/IToken'
import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema<IToken>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	token: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 300
	}
})

const Token = mongoose.model('Token', tokenSchema)

export default Token
