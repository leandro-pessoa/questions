import mongoose from 'mongoose'

export const connectDatabase = async (): Promise<
	mongoose.Connection | undefined
> => {
	try {
		// utiliza a string de conexão do mongoose que precisa ser informada no arquivo .env
		mongoose.connect((process.env.CLOUD_DATABASE_CONNECTION_STRING || process.env.LOCAL_DATABASE_CONNECTION_STRING) ?? '', { authSource: 'admin' })
		return mongoose.connection
	} catch (err) {
		console.log(err)
	}
}
