import request from 'supertest'
import app from '../../src/app'

describe('pagination middleware tests', () => {
	it('should return an error if typeof limit or page is string', async () => {
		await request(app)
			.get('/questions?page=teste')
			.expect(400, {
				status: 400,
				message: 'Requisição inválida'
			})
	})

	it('should return an error if order is different of 1 or -1', async () => {
		await request(app)
			.get('/questions?order=20')
			.expect(400, {
				status: 400,
				message: 'Requisição inválida'
			})
	})

	it('should return an error if limit and page is 0 or less', async () => {
		await request(app)
			.get('/questions?limit=0&page=0')
			.expect(400, {
				status: 400,
				message: 'Requisição inválida'
			})
	})

	it('should return five results for page', async () => {
		await request(app)
			.get('/questions?limit=5')
			.expect(200)
			.then(res => {
				expect(res.body).toHaveLength(5)
			})
	})
})
