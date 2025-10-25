import type { Request, Response, Application } from 'express'
import questions from './questionsRoutes.js'
import users from './usersRoutes.js'
import express from 'express'

const routes = (app: Application) => {
	app.route('/').get((req: Request, res: Response) => res.status(200).send('Rota base'))

	app.use(express.json(), questions, users)
}

export default routes
