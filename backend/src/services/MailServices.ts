import nodemailer from 'nodemailer'
import CRUDServices from './CRUDServices'
import Token from '@/db/models/Token'

import type { IToken } from '@/types/IToken'

export default class MailServices extends CRUDServices<IToken> {
	constructor() {
		super(Token)
	}

	// service para encaminhar um email para um destinatário específico
	// parâmetros:
	// email remetente
	// senha do email remetente
	// email destinatário
	// assunto do email
	// mensagem (corpo) do email (em html)
	static async sendEmail(
		email: string,
		emailPassword: string,
		destinationEmail: string,
		subject: string,
		message: string
	) {
		// transportador com o serviço e o email remetente
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: email,
				pass: emailPassword
			}
		})

		// envia a mensagem para o destinatário
		await transporter.sendMail({
			from: `"Não responda" <${email}>`,
			to: destinationEmail,
			subject,
			html: message
		})
	}

	// cria um documento contendo principalmente o token enviado no email e o id do user em questão
	async createToken(userId: string, token: string) {
		await super.addOne({userId, token})
	}

	// obtém um documento com base no user
	async getToken(userId: string) {
		const result = await super.getOne({ userId })
		return result
	}
}
