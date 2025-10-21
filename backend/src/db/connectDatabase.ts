import mongoose from "mongoose"

export const connectDatabase = async (): Promise<mongoose.Connection | undefined> => {
	try {
		mongoose.connect(process.env.DATABASE_CONNECTION_STRING ?? '')
		return mongoose.connection
	} catch(err) {
		console.log(err)
	}
}
