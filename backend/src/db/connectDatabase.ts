import mongoose from "mongoose"

export const connectDatabase = async (): Promise<mongoose.Connection | undefined> => {
	try {
		mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.cjn95ex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
		return mongoose.connection
	} catch(err) {
		console.log(err)
	}
}
