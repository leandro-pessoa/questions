import express from 'express'
import { connectDatabase } from './db/connectDatabase'
import routes from './routes/index'
import errors from './middlewares/errors'

// conexão com o banco de dados
connectDatabase().then(() => { console.log('Conectado ao banco de dados')})

const app = express()

// rotas
routes(app)

app.use(errors)

export default app
