import request from 'supertest'
import app from '../../src/app'

describe('User routes', () => {
	it('should return an error when completeName is not submitted', async () => {
		await request(app)
			.post('/users')
			.send({
				email: 'leandro@gmail.com',
				password: '123@Lea',
			})
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: ['completeName: Nome completo obrigatório'],
			})
	})
})
