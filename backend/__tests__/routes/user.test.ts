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

const createTestUser = async () => {
	await request(app)
		.post('/users')
		.send(testUserData)
		.set('Content-Type', 'application/json')
}

const deleteTestUser = async () => {
	await request(app)
		.delete(`/users/${_id}`)
		.set('Authorization', `Bearer ${adminToken}`)
}

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

describe('User GET', () => {
	beforeAll(async () => {
		await createTestUser()
	})

	afterAll(async () => {
		await deleteTestUser()
	})

	it('should return an error if user does not exist', async () => {
		await request(app)
			.get('/users/69169cea4b1e3b44ecffde93')
			.set('Authorization', `Bearer ${adminToken}`)
			.expect(404, {
				status: 404,
				message: 'Valor não encontrado'
			})
	})

	it('should return an error if the id format is invalid', async () => {
		await request(app)
			.get('/users/69169cea4b1e3b44ecffde9')
			.set('Authorization', `Bearer ${adminToken}`)
			.expect(400, {
				status: 400,
				message: 'Requisição inválida'
			})
	})

	it('return the users on get', async () => {
		await request(app)
			.get('/users')
			.set('Authorization', `Bearer ${adminToken}`)
			.expect(200)
			.then(res => {
				expect(res.body[0].completeName).toBeDefined()
				expect(res.body[0].email).toBeDefined()
			})
	})

	it('return user on get by id', async () => {
		await request(app)
			.get(`/users/${_id}`)
			.set('Authorization', `Bearer ${adminToken}`)
			.expect(200)
			.then(res => {
				expect(res.body.completeName).toEqual(completeName)
				expect(res.body.email).toEqual(email)
			})
	})
})

describe('User POST', () => {
	afterEach(async () => {
		await deleteTestUser()
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
		await createTestUser()

		await request(app)
			.post('/users')
			.send(testUserData)
			.set('Content-Type', 'application/json')
			.expect(409, {
				status: 409,
				message: 'E-mail já cadastrado',
			})
	})

	it('should return an error if e-mail or user is not submitted in login', async () => {
		await request(app)
			.post('/users/login')
			.send({})
			.expect(401, {
				status: 401,
				message: 'Credenciais inválidas'
			})
	})

	it('should return an error if the user doesnt exists in login', async () => {
		await request(app)
			.post('/users/login')
			.send({
				email: 'batata@gmail.com',
				password: '123@Bat'
			})
			.expect(401, {
				status: 401,
				message: 'Credenciais inválidas'
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
				expect(res.body.completeName).toEqual('Teste')
				expect(res.body.email).toEqual('teste@gmail.com')
				expect(res.body.password).toEqual('123@Tes')
			})
	})

	it('should return a token and user when you log in', async () => {
		await createTestUser()

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
		await createTestUser()
	})

	afterEach(async () => {
		await deleteTestUser()
	})

	it('should return an error if user dont exists', async () => {
		await request(app)
			.put('/users/69169cea4b1e3b44ecffde93')
			.send({email: 'teste@gmaill.com'})
			.set('Authorization', `Bearer ${adminToken}`)
			.set('Content-Type', 'application/json')
			.expect(404, {
				status: 404,
				message: 'Valor não encontrado'
			})
	})

	it('should return an error when e-mail already exists', async () => {
		await createTestUser()

		await request(app)
			.post('/users/login')
			.send({email, password})
			.set('Content-Type', 'application/json')
			.then(async res => {
				await request(app)
					.put('/users')
					.send({email})
					.set('Authorization', `Bearer ${res.body.token}`)
					.set('Content-Type', 'application/json')
					.expect(409, {
						status: 409,
						message: 'E-mail já cadastrado',
					})
			})
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
						password: '123@Tes'
					})
					.set('Authorization', `Bearer ${res.body.token}`)
					.set('Content-Type', 'application/json')
					.expect(200)
					.then((res) => {
						expect(res.body.completeName).toEqual('Teste Update')
						expect(res.body.email).toEqual('testeupdate@gmail.com')
					})
			})
	})
})

describe('User DELETE', () => {
	it('should return deleted user when delete by id', async () => {
		await createTestUser()

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
