import request from 'supertest'
import app from '../../src/app'

describe('mail tests', () => {
	it('should return an error if email has not been sent', async () => {
		await request(app)
			.post('/sendChangePasswordCode')
			.expect(500, {
				status: 500,
				message: 'Erro interno do servidor',
			})
	})

	it('should return an error if email receiver has not been found in database', async () => {
		await request(app)
			.post('/sendChangePasswordCode')
			.send({ email: 'teste@mail.com' })
			.expect(404, {
				status: 404,
				message: 'Valor não encontrado',
			})
	})

	it('should return an error if email or code has not been sent', async () => {
		await request(app)
			.post('/confirmPasswordCode')
			.expect(500, {
				status: 500,
				message: 'Erro interno do servidor',
			})
	})

	it('should return an error if email receiver has not been found in database in confirm password', async () => {
		await request(app)
			.post('/confirmPasswordCode')
			.send({ email: 'teste@mail.com' })
			.expect(404, {
				status: 404,
				message: 'Valor não encontrado',
			})
	})

	it('should return an error if result is inexistent in token database', async () => {
		await request(app)
			.post('/confirmPasswordCode')
			.send({ email: 'testefront@gmail.com' })
			.expect(400, {
				status: 400,
				message: 'Código expirado ou inválido. Tente novamente',
			})
	})

	it('should return an error if sender email or password has not been configured', async () => {
		process.env.GOOGLE_APP_EMAIL = ''
		process.env.GOOGLE_APP_PASSWORD = ''

		await request(app)
			.post('/sendChangePasswordCode')
			.send({ email: 'teste@mail.com' })
			.expect(500, {
				status: 500,
				message: 'Erro interno do servidor',
			})
	})
})
