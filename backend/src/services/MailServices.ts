import nodemailer from 'nodemailer'

export default class MailServices {
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
}
