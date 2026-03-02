import nodemailer from 'nodemailer'
import CRUDServices from './CRUDServices'
import Token from '@/db/models/Token'

import type { IToken } from '@/types/IToken'

export default class MailServices extends CRUDServices<IToken> {
	constructor() {
		super(Token)
	}

	static async sendEmail(
		email: string,
		emailPassword: string,
		destinationEmail: string,
		subject: string,
		message: string
	) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: email,
				pass: emailPassword
			}
		})

		await transporter.sendMail({
			from: `"Não responda" <${email}>`,
			to: destinationEmail,
			subject,
			html: message
		})
	}

	async createToken(userId: string, token: string) {
		await super.addOne({userId, token})
	}

	async getToken(userId: string) {
		const result = await super.getOne({ userId })
		return result
	}
}
