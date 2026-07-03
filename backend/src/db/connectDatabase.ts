import mongoose from 'mongoose'

export const connectDatabase = async (): Promise<
	mongoose.Connection | undefined
> => {
	try {
		// utiliza a string de conexão do mongoose que precisa ser informada no arquivo .env
		mongoose.connect(process.env.DATABASE_CONNECTION_STRING ?? '')
		return mongoose.connection
	} catch (err) {
		console.log(err)
	}
}
