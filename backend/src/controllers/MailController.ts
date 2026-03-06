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

	// controller para enviar o código de alteração de senha no email
	async sendChangePasswordCode(req: Request, res: Response, next: NextFunction) {
		const { email } = req.body

		// código (token) aleatório que será enviado no email
		const code = generateRandomCode(6)

		// verifica se o email e senha do remetente estão declarados no arquivo .env
		// caso não, retorna um erro
		if(!process.env.GOOGLE_APP_EMAIL || !process.env.GOOGLE_APP_PASSWORD) {
			next(new BaseError('E-mail e senha do remetente não definidos.'))
			return
		}

		try {
			// verifica se o user informado existe
			const user = await userService.getOne({ email })

			// retorna erro not found caso não exista
			if (!user) {
				next(new NotFound())
				return
			}

			// encaminha a mensagem para o email do usuário em questão
			// utilizando o service sendEmail
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

			// verifica se o documento consta na base de dados (expira em 5 minutos ou na confirmação)
			const tokenAlreadyExists = await mailService.getOne({ userId: user._id })

			// caso conste, remove o documento anterior
			if (tokenAlreadyExists) {
				await mailService.deleteOne(tokenAlreadyExists._id)
			}

			// cria o documento com o token e o código do user
			await mailService.createToken(user._id, code)

			res.status(200).json({
				message: 'Código enviado para o seu e-mail'
			})
		} catch (err) {
			next(err)
		}
	}

	// confirma o token enviado no email
	async confirmPasswordCode(req: Request, res: Response, next: NextFunction) {
		const { code, email } = req.body

		try {
			// verifica se o user existe
			const user = await userService.getOne({ email })

			// caso não exista, retorna um not found
			if (!user) {
				next(new NotFound())
				return
			}

			// obtém o documento que contém o token
			const result = await mailService.getToken(user._id)

			// caso o documento não exista ou o token enviado seja diferente
			// retorna uma bad request
			if (!result || code !== result.token) {
				next(new BadRequest('Código expirado ou inválido. Tente novamente'))
				return
			}

			// resposta
			res.status(200).json({isCorrectCode: true})

			// remove o documento contendo o token da base de dados
			await mailService.deleteOne(result._id)
		} catch(err) {
			next(err)
		}
	}
}
