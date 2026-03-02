import BadRequest from '@/errors/BadRequest'
import BaseError from '@/errors/BaseError'
import NotFound from '@/errors/NotFound'
import MailServices from '@/services/MailServices'
import UserService from '@/services/UserService'
import { generateRandomCode } from '@/utils/generateRandomCode'

import type { Request, Response, NextFunction } from 'express'

const mailService = new MailServices()
const userService = new UserService()

export default class MailController {
	async sendChangePasswordCode(req: Request, res: Response, next: NextFunction) {
		const { email } = req.body
		const code = generateRandomCode(6)

		if(!process.env.GOOGLE_APP_EMAIL || !process.env.GOOGLE_APP_PASSWORD) {
			next(new BaseError('E-mail e senha do remetente não definidos.'))
			return
		}

		try {
			const user = await userService.getOne({ email })

			if (!user) {
				next(new NotFound())
				return
			}

			await MailServices.sendEmail(
				process.env.GOOGLE_APP_EMAIL,
				process.env.GOOGLE_APP_PASSWORD,
				email,
				'(Questions) - Alteração de senha',
				`
					<div>
						<p>Segue o seu código para redefinição da sua senha do app Questions:</p>
						<br/>
						<p>${code}</p>
					<div>
				`
			)

			await mailService.createToken(user._id, code)

			res.status(200).json({
				message: 'Código enviado para o seu e-mail'
			})
		} catch (err) {
			next(err)
		}
	}

	async confirmPasswordCode(req: Request, res: Response, next: NextFunction) {
		const { code, email } = req.body

		try {
			const user = await userService.getOne({ email })

			if (!user) {
				next(new NotFound())
				return
			}

			const result = await mailService.getToken(user._id)

			if (!result || code !== result.token) {
				next(new BadRequest('Código expirado ou inválido. Tente novamente'))
				return
			}

			res.status(200).json({isCorrectCode: true})

			await mailService.deleteOne(result._id)
		} catch(err) {
			next(err)
		}
	}
}
