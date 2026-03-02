import type mongoose from 'mongoose'

export interface IToken {
	_id: string
	userId: mongoose.Schema.Types.ObjectId
	token: string
	createdAt: mongoose.Schema.Types.Date
}
