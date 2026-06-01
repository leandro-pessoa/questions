import BadRequest from '@/errors/BadRequest'
import BaseError from '@/errors/BaseError'
import NotFound from '@/errors/NotFound'
import MailServices from '@/services/MailServices'
import UserService from '@/services/UserService'
import { generateRandomCode } from '@/utils/generateRandomCode'
import jwt from 'jsonwebtoken'
import UserLimiter from '@/db/models/UserLimiter'

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
				throw new BadRequest('Código expirado ou inválido. Tente novamente')
			}

			// chave secreta para o json web token
			const secretKey = process.env.TOKEN_SECRET

			// verifica se o token está declarado no arquivo .env
			// caso não, retorna um erro 500
			if (!secretKey) {
				console.error('Chave secreta do token inválida')
				next(new BaseError())
				return
			}

			const limiter = await UserLimiter.findOne({ email })

			// verifica se a quantidade máxima de tentativas foi atingida
			if (limiter && limiter.count >= 5) {
				// verifica se o documento consta na base de dados (expira em 5 minutos ou na confirmação)
				const tokenAlreadyExists = await mailService.getOne({ userId: user._id })

				// caso conste, remove o documento que permite confirmar o código
				if (tokenAlreadyExists) {
					await mailService.deleteOne(tokenAlreadyExists._id)
				}

				// caso sim, não permite o user confirmar o código
				// mesmo que o código esteja correto
				throw new BadRequest('Quantidade máxima de tentativas excedidas. Aguarde 5 minutos', 401)
			}

			// cria um token para validar a alteração no UserController
			// o token expira em 2 minutos
			const token = jwt.sign({ userId: user._id }, secretKey, {expiresIn: 120})

			// resposta
			res.status(200).json({ isCorrectCode: true, token })

			// remove o documento contendo o token da base de dados
			await mailService.deleteOne(result._id)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch(err: any) {
			// caso seja erro de credenciais inválidas
			if (err.msg === 'Código expirado ou inválido. Tente novamente') {
				// executa o service que irá verificar a quantidade de tentativas
				await userService.limiter(email)
			}
			next(err)
		}
	}
}
