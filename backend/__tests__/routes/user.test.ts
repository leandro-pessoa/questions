import request from 'supertest'
import app from '../../src/app'

const testUserData = {
	_id: '69169cea4b1e3b44ecffde92',
	completeName: 'Teste',
	email: 'teste@gmail.com',
	password: '123@Tes',
}

const { _id, completeName, email, password } = testUserData

let adminToken: string

beforeAll(async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: process.env.ADMIN_EMAIL,
			password: process.env.ADMIN_PASSWORD,
		})
		.then((res) => {
			adminToken = res.body.token
		})
})

describe('User GET', () => {})

describe('User POST', () => {
	afterEach(async () => {
		await request(app)
			.delete(`/users/${_id}`)
			.set('Authorization', `Bearer ${adminToken}`)
	})

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
					'completeName: Nome completo obrigatório',
				],
			})
	})

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
					'completeName: Nome completo obrigatório',
				],
			})
	})

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
					'completeName: Nome completo obrigatório',
				],
			})
	})

	it('should return an error when email is invalid', async () => {
		await request(app)
			.post('/users')
			.send({
				completeName,
				email: 'dsadsadsa@',
				password,
			})
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: ['email: E-mail inválido'],
			})
	})

	it('should return an error when password is weak', async () => {
		await request(app)
			.post('/users')
			.send({
				completeName,
				email,
				password: '123456',
			})
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: ['password: Senha muito fraca'],
			})
	})

	it('should return an error when attributes length is too short', async () => {
		await request(app)
			.post('/users')
			.send({
				completeName: '11',
				email: 'aa',
				password: '12@Le',
			})
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: [
					'completeName: O nome completo precisa ter pelo menos 3 caracteres',
					'email: E-mail inválido',
					'password: A senha precisa ter pelo menos 6 caracteres',
				],
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
				message: 'E-mail já cadastrado',
			})
	})

	it('should create an user if submitted attibutes is valid', async () => {
		await request(app)
			.post('/users')
			.send(testUserData)
			.set('Content-Type', 'application/json')
			.expect(201)
			.then((res) => {
				expect(res.body.role).toEqual('default')
				expect.objectContaining({
					role: 'default',
					completeName: 'Teste',
					email: 'teste@gmail.com',
					answeredQuestions: [],
					password: '123@Tes',
				})
			})
	})

	it('should return a token and user when you log in', async () => {
		await request(app)
			.post('/users')
			.send(testUserData)
			.set('Content-Type', 'application/json')

		await request(app)
			.post('/users/login')
			.send({
				email,
				password,
			})
			.set('Content-Type', 'application/json')
			.expect(200)
			.then((res) => {
				expect(res.body.token).toHaveLength(237)
				expect(res.body.user.id).toBeDefined()
				expect(res.body.user.email).toBeDefined()
				expect(res.body.user.completeName).toBeDefined()
			})
	})
})

describe('User UPDATE', () => {
	beforeEach(async () => {
		await request(app)
			.post('/users')
			.send(testUserData)
			.set('Content-Type', 'application/json')
	})

	afterEach(async () => {
		await request(app)
			.delete(`/users/${_id}`)
			.set('Authorization', `Bearer ${adminToken}`)
	})

	it('should return updated user when update', async () => {
		await request(app)
			.post('/users/login')
			.send({
				email,
				password,
			})
			.set('Content-Type', 'application/json')
			.then(async (res) => {
				await request(app)
					.put('/users')
					.send({
						completeName: 'Teste Update',
						email: 'testeupdate@gmail.com',
					})
					.set('Authorization', `Bearer ${res.body.token}`)
					.set('Content-Type', 'application/json')
					.expect(200)
					.then((res) => {
						console.log(res.body)
						expect(res.body.completeName).toEqual('Teste Update')
						expect(res.body.email).toEqual('testeupdate@gmail.com')
					})
			})
	})
})

describe('User DELETE', () => {
	it('should return deleted user when delete by id', async () => {
		await request(app)
			.post('/users')
			.send(testUserData)
			.set('Content-Type', 'application/json')

		await request(app)
			.post('/users/login')
			.send({
				email,
				password,
			})
			.set('Content-Type', 'application/json')
			.then(async res => {
				await request(app)
					.delete(`/users`)
					.set('Authorization', `Bearer ${res.body.token}`)
					.expect(200)
					.then((res) => {
						expect(res.body._id).toEqual(_id)
						expect(res.body.completeName).toEqual(completeName)
						expect(res.body.email).toEqual(email)
					})
			})

	})
})
