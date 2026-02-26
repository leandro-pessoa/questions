import BadRequest from '@/errors/BadRequest'
import BaseError from '@/errors/BaseError'
import MailServices from '@/services/MailServices'
import { generateRandomCode } from '@/utils/generateRandomCode'

import type { Request, Response, NextFunction } from 'express'

export default class MailController {
	private changePassCode!: string

	async sendChangePasswordCode(req: Request, res: Response, next: NextFunction) {
		const { email } = req.body
		this.changePassCode = generateRandomCode(6)

		if(!process.env.GOOGLE_APP_EMAIL || !process.env.GOOGLE_APP_PASSWORD) {
			next(new BaseError('E-mail e senha do remetente não definidos.'))
			return
		}

		try {
			await MailServices.sendEmail(
				process.env.GOOGLE_APP_EMAIL,
				process.env.GOOGLE_APP_PASSWORD,
				email,
				'(Questions) - Alteração de senha',
				`
					<div>
						<p>Segue o seu código para redefinição da sua senha do app Questions:</p>
						<br/>
						<p>${this.changePassCode}</p>
					<div>
				`
			)

			res.status(200).json({
				message: 'Código enviado para o seu e-mail'
			})
		} catch (err) {
			next(err)
		}
	}

	async confirmPasswordCode(req: Request, res: Response, next: NextFunction) {
		const { code } = req.body

		if (this.changePassCode && code === this.changePassCode) {
			res.status(200).json({isCorrectCode: true})
			this.changePassCode = ''
		} else {
			next(new BadRequest('Código expirado ou inválido'))
		}
	}
}
