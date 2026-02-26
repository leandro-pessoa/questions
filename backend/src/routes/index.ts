import type { Request, Response, Application } from 'express'
import questions from './questionsRoutes'
import users from './usersRoutes'
import mail from './mailRoutes'
import express from 'express'

const routes = (app: Application) => {
	app.route('/').get((req: Request, res: Response) => res.status(200).send('Rota base'))

	app.use(express.json(), questions, users, mail)
}

export default routes
