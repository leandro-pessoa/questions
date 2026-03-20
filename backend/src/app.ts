import express from 'express'
import { connectDatabase } from './db/connectDatabase'
import routes from './routes/index'
import errors from './middlewares/errors'
import cors from 'cors'
import { corsOptions } from './config/corsOptions'
import helmet from 'helmet'
import delay from 'express-delay'

// conexão com o banco de dados
connectDatabase().then(() => { console.log('Conectado ao banco de dados')})

const app = express()

// delay para testar o loading do frontend
app.use(delay(1000))

// utilização do cors em todas as rotas
app.use(cors(corsOptions))

// helmet, para headers mais seguros
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' }}))

// rotas
routes(app)

app.use(errors)

export default app
