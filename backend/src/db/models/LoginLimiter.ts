import mongoose from 'mongoose'

const loginLimiterSchema = new mongoose.Schema({
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

const LoginLimiter = mongoose.model('LoginLimiter', loginLimiterSchema)

export default LoginLimiter
