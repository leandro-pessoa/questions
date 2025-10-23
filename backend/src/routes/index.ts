import type { Request, Response, Application } from 'express'


const routes = (app: Application) => {
	app.route('/').get((req: Request, res: Response) => res.status(200).send('Rota base'))
}

export default routes
