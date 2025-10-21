import express from 'express'
import { connectDatabase } from './db/connectDatabase.js'

const connect = await connectDatabase()
connect?.once('open', () => { console.log('Conectado ao banco de dados')})

const app = express()

export default app
