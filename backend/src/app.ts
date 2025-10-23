import express from 'express'
import { connectDatabase } from './db/connectDatabase.js'
import routes from './routes/index.js'

const connect = await connectDatabase()
connect?.once('open', () => { console.log('Conectado ao banco de dados')})

const app = express()

routes(app)

export default app
