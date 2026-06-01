import mongoose from 'mongoose'

const userLimiterSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	count: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 300
	}
})

const UserLimiter = mongoose.model('UserLimiter', userLimiterSchema)

export default UserLimiter
