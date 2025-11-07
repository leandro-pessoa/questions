import request from 'supertest'
import { describe, it } from 'node:test'
import app from '../../src/app'

describe('User routes', () => {
	it('should return error when completeName is not send', async () => {
		const res = (await request(app).post('/users')).send({
			email: 'leandro@gmail.com',
			password: '123@Lea',
		})
		res.expect(400, {
			errors: {
				status: 400,
				message: ['completeName: Nome completo obrigatório'],
			},
		})
	})
})
