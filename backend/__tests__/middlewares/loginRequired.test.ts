import request from 'supertest'
import app from '../../src/app'

const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGZkNTE4YWY3ODUzOTVhOWEzODcxZWEiLCJjb21wbGV0ZU5hbWUiOiJMZWFuZHJvIFBlc3NvYSBTb3V6YSBkb3MgUmVpcyIsImVtYWlsIjoibGVhbmRyb0BnbWFpbC5jb20iLCJpYXQiOjE3NjM3NjMwNDYsImV4cCI6MTc2NDM2Nzg0Nn0.BNa86FDmqg_rzskBebRU4olpziPPkB8H1fO8AQgFyD3'

describe('loginRequired tests', () => {
	it('should return an error when user try to access route with required login', async () => {
		await request(app)
			.put('/users')
			.send({email: 'teste@gmail.com'})
			.expect(401, {
				status: 401,
				message: 'Login necessário'
			})
	})

	it('should return an error when token is not submitted', async () => {
		await request(app)
			.put('/users')
			.send({email: 'teste@gmail.com'})
			.set('Authorization', 'Bearer ')
			.expect(401, {
				status: 401,
				message: 'Login necessário'
			})
	})

	it('should return an error when token secret is invalid', async () => {
		const oldTokenSecret = process.env.TOKEN_SECRET
		process.env.TOKEN_SECRET = ''

		await request(app)
			.put('/users')
			.send({email: 'teste@gmail.com'})
			.set('Authorization', 'Bearer aaaaaaa')
			.expect(500, {
				status: 500,
				message: 'Erro interno do servidor'
			})

		process.env.TOKEN_SECRET = oldTokenSecret
	})

	it('should return an error if token doesnt match to any user or are expired', async () => {
		await request(app)
			.put('/users')
			.send({email: 'teste@gmail.com'})
			.set('Authorization', `Bearer ${testToken}`)
			.expect(401, {
				status: 401,
				message: 'Token inválido ou expirado. Faça o login novamente'
			})
	})
})
