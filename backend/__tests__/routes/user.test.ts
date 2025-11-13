import request from 'supertest'
import app from '../../src/app'

const testUserData = {
	completeName: 'Teste',
	email: 'teste@gmail.com',
	password: '123@Tes'
}

const { completeName, email, password } = testUserData

describe('User routes errors', () => {
	it('should return an error when completeName, email and password is not submitted', async () => {
		await request(app)
			.post('/users')
			.send({})
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: [
					'password: Senha obrigatória',
					'email: E-mail obrigatório',
					'completeName: Nome completo obrigatório'
				],
			})
	})

	it('should return an error when email is invalid', async () => {
		await request(app)
			.post('/users')
			.send({
				completeName,
				email: 'dsadsadsa@',
				password
			})
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: ['email: E-mail inválido']
			})
	})

	it('should return an error when password is weak', async () => {
		await request(app)
			.post('/users')
			.send({
				completeName,
				email,
				password: '123456'
			})
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: ['password: Senha muito fraca']
			})
	})

	it('should return an error when attributes length is too short', async () => {
		await request(app)
			.post('/users')
			.send({
				completeName: '11',
				email: 'aa',
				password: '12@Le'
			})
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: [
					'completeName: O nome completo precisa ter pelo menos 3 caracteres',
					'email: E-mail inválido',
					'password: A senha precisa ter pelo menos 6 caracteres'
      			]
			})
	})

	it('should return an error when e-mail already exists', async () => {
		await request(app)
			.post('/users')
			.send(testUserData)
			.set('Content-Type', 'application/json')

		await request(app)
			.post('/users')
			.send(testUserData)
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: 'E-mail já cadastrado'
			})

		await request(app)
			.post('/users/login')
			.send({
				email,
				password
			})
			.set('Content-Type', 'application/json')
			.then(async res => {
				await request(app)
					.set('Authorization', `Bearer ${res.body.token}`)
					.delete('/users')
			})
	})
})

describe('User routes', () => {
	it('should create an user if submitted attibutes is valid', async () => {
		await request(app)
			.post('/users')
			.send(testUserData)
			.set('Content-Type', 'application/json')
			.expect(201)
			.then(res => {
				expect(res.body.role).toEqual('default')
				expect.objectContaining({
					role: 'default',
					completeName: 'Teste',
					email: 'teste@gmail.com',
					answeredQuestions: [],
					password: '123@Tes'
				})
			})
	})

	it('should return a token and user when you log in', async () => {
		await request(app)
			.post('/users/login')
			.send({
				email,
				password
			})
			.set('Content-Type', 'application/json')
			.expect(200)
			.then(res => {
				expect(res.body.token).toHaveLength(237)
				expect(res.body.user.id).toBeDefined()
				expect(res.body.user.email).toBeDefined()
				expect(res.body.user.completeName).toBeDefined()
			})
	})

	it('should return updated user when update', async () => {
		await request(app)
			.put('/users')
			.send({
				completeName: 'Teste Update',
				email: 'testeupdate@gmail.com'
			})
			.set('Content-Type', 'application/json')
			.expect(200)
			.then(res => {
				expect(res.body.user.completeName).toBeDefined()
			})
	})
})


