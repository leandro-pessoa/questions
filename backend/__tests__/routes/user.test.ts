import request from 'supertest'
import app from '../../src/app'
import {
	testUserData,
	_id, completeName,
	email,
	password,
	login,
	deleteTestUser,
	createTestUser
} from '../testUtils/testUsers'
import { getAdminToken } from '../testUtils/getAdminToken'
import { generateRandomCode } from '../../src/utils/generateRandomCode'
import type { IAnsweredQuestion } from '../../src/types/IAnsweredQuestion'

let adminToken: string

beforeAll(async () => {
	adminToken = await getAdminToken()
})

describe('User POST', () => {
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
				email: 'teste2@gmail.com',
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
			.set('Content-Type', 'application/json')
			.expect(401, {
				status: 401,
				message: 'Credenciais inválidas'
			})
	})

	it('should return an error if the user try to add role admin on post body', async () => {
		await request(app)
			.post('/users')
			.send({
				email,
				password,
				role: 'admin'
			})
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: 'Requisição inválida'
			})
	})

	it('should create an user if submitted attibutes is valid', async () => {
		await deleteTestUser(adminToken)

		await request(app)
			.post('/users')
			.send(testUserData)
			.set('Content-Type', 'application/json')
			.expect(201)
			.then(res => {
				expect(res.body.role).toEqual('default')
				expect(res.body.completeName).toEqual('Teste')
				expect(res.body.email).toEqual('teste@gmail.com')
				expect(res.body.password).toEqual('123@Tes')
			})
	})

	it('should return an error when e-mail already exists', async () => {
		await request(app)
			.post('/users')
			.send(testUserData)
			.set('Content-Type', 'application/json')
			.expect(409, {
				status: 409,
				message: 'E-mail já cadastrado',
			})
	})

	it('should return an error if the password is invalid', async () => {
		await request(app)
			.post('/users/login')
			.set('Content-Type', 'application/json')
			.send({
				email,
				password: '123456'
			})
			.expect(401, {
				status: 401,
				message: 'Credenciais inválidas'
			})
	})

	it('should return an error if maximum of attempts is reached at login', async () => {
		const testEmail = `teste${generateRandomCode(6)}@gmail.com`

		for (let i = 0; i <= 5; i++) {
			if (i === 5) {
				await request(app)
				.post('/users/login')
				.set('Content-Type', 'application/json')
				.send({
					email: testEmail,
					password: '123456'
				}).expect(401, {
					message: 'Quantidade máxima de tentativas excedidas. Aguarde 5 minutos',
					status: 401
				})
				break
			}

			await request(app)
				.post('/users/login')
				.set('Content-Type', 'application/json')
				.send({
					email: testEmail,
					password: '123456'
				})
		}

	})

	it('should return a token and user when you log in', async () => {
		await request(app)
			.post('/users/login')
			.send({
				email,
				password,
			})
			.set('Content-Type', 'application/json')
			.expect(200)
			.then(res => {
				expect(res.body.token).toHaveLength(260)
				expect(res.body.user.id).toBeDefined()
				expect(res.body.user.email).toBeDefined()
				expect(res.body.user.completeName).toBeDefined()
			})
	})
})

describe('User GET', () => {
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

	it('should return user answered questions at getUserAnsweredQuestions', async () => {
		// matching example
		// 2026-04-03T20:33:39.712Z
		const timeRegexp = /^\d{4}-\d{2}-\d{2}T(\d{2}:){2}\d{2}\.\d{3}Z$/

		await login(email, password)
			.then(async res => {
				await request(app)
					.put('/users/answerQuestion')
					.send({
						questionId: '68fcc7310f020b7ccf14cdd7',
						selectedOption: {right: true, text: 'Eu', letter: 'B'}
					})
					.set('Authorization', `Bearer ${res.body.token}`)
					.set('Content-Type', 'application/json')
		})

		await login(email, password)
			.then(async res => {
				await request(app)
					.get('/users/getAnsweredQuestions')
					.set('Authorization', `Bearer ${res.body.token}`)
					.then((res: {body: {answeredQuestions: IAnsweredQuestion[], correct: number, incorrect: number, weeklyAnsweredQuestions: number[]}}) => {
						expect(res.body.answeredQuestions[0].questionId).toEqual('68fcc7310f020b7ccf14cdd7')
						expect(res.body.answeredQuestions[0].selectedOption).toEqual(
							{right: true, text: 'Eu', letter: 'B'}
						)
						expect(res.body.answeredQuestions[0].isCorrectAnswer).toBeTruthy()
						expect(res.body.answeredQuestions[0].createdAt).toMatch(timeRegexp)
						expect(res.body.answeredQuestions[0].updatedAt).toMatch(timeRegexp)
						expect(res.body.correct).toEqual(1)
						expect(res.body.incorrect).toEqual(0)
						expect(res.body.weeklyAnsweredQuestions).toHaveLength(7)
					})
			})
	})

	it('return the users on get', async () => {
		await request(app)
			.get('/users')
			.set('Authorization', `Bearer ${adminToken}`)
			.expect(200)
			.then(res => {
				expect(res.body.pageResult[0].completeName).toBeDefined()
				expect(res.body.pageResult[0].email).toBeDefined()
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

describe('User UPDATE', () => {
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
		await login(email, password)
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

	it('should return an error if the user try to add role admin on update body', async () => {
		await login(email, password)
			.then(async res => {
				await request(app)
					.put('/users')
					.send({
						email,
						password,
						role: 'admin'
					})
					.set('Authorization', `Bearer ${res.body.token}`)
					.set('Content-Type', 'application/json')
					.expect(400, {
						status: 400,
						message: 'Requisição inválida'
					})
			})
	})

	it('should return notfound error if questionId param is not sent to the answerQuestion method', async () => {
		await login(email, password)
			.then(async res => {
				await request(app)
					.put('/users/answerQuestion')
					.send({})
					.set('Authorization', `Bearer ${res.body.token}`)
					.set('Content-Type', 'application/json')
					.expect(404, {
						status: 404,
						message: 'Valor não encontrado'
					})
			})
	})

	it('should return badrequest error if other params is not sent to the answerQuestion method', async () => {
		await login(email, password)
			.then(async res => {
				await request(app)
					.put('/users/answerQuestion')
					.send({
						questionId: '68fcc7310f020b7ccf14cdd7'
					})
					.set('Authorization', `Bearer ${res.body.token}`)
					.set('Content-Type', 'application/json')
					.expect(400, {
						status: 400,
						message: 'Requisição inválida'
					})
			})
	})

	it('should return an error if authorization was not sent at updateUserPassword', async () => {
		await request(app)
			.put('/users/updateUserPassword')
			.send({ password: '123456@Tes' })
			.expect(400, {
				status: 400,
				message: 'Requisição inválida'
			})
	})

	it('should return an error if authorization was sent without the token at updateUserPassword', async () => {
		await request(app)
			.put('/users/updateUserPassword')
			.send({ password: '123456@Tes' })
			.set('Authorization', `Bearer`)
			.expect(401, {
				status: 401,
				message: 'Token inválido'
			})
	})

	it('should return an error if the token doesnt return an valid user at updateUserPassword', async () => {
		const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTE1M2Y1OWNjMjk0YTY3MjFmZmFhOGIiLCJjb21wbGV0ZU5hbWUiOiJBZG1pbiIsImVtYWlsIjoibGVhbmRyb3Blc3NvYXJlaXNAZ21haWwuY29tIiwicn9sZSI6ImFkbWluIiwiaWF0IjoxNzc0MjMxMDQzLCJleHAiOjE3NzQ4MzU4NDN9.lvXORESr2QtFCm91hSfozMJ8sLAyvXP8Ntx8jiFF3ua'

		await request(app)
			.put('/users/updateUserPassword')
			.send({ password: '123456@Tes' })
			.set('Authorization', `Bearer ${testToken}`)
			.expect(401, {
				status: 401,
				message: 'Token expirado ou inválido'
			})
	})

	it('should return the user with correct answered question', async () => {
		await login(email, password)
			.then(async res => {
				await request(app)
					.put('/users/answerQuestion')
					.send({
						questionId: '68fcc7310f020b7ccf14cdd7',
    					selectedOption: {right: true, text: 'Eu', letter: 'B'}
					})
					.set('Authorization', `Bearer ${res.body.token}`)
					.set('Content-Type', 'application/json')
					.then((res: {body: {answeredQuestions: IAnsweredQuestion[]}}) => {
						expect(res.body.answeredQuestions[0].questionId).toEqual('68fcc7310f020b7ccf14cdd7')
						expect(res.body.answeredQuestions[0].selectedOption).toEqual(
							{right: true, text: 'Eu', letter: 'B'}
						)
						expect(res.body.answeredQuestions[0].isCorrectAnswer).toBeTruthy()
					})
			})
	})

	it('should return updated user when update', async () => {
		await login(email, password)
			.then(async res => {
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
					.then(res => {
						expect(res.body.completeName).toEqual('Teste Update')
						expect(res.body.email).toEqual('testeupdate@gmail.com')
					})
			})
	})
})

describe('User DELETE', () => {
	it('should return deleted user when the user delete your own account', async () => {
		await login('testeupdate@gmail.com', password)
			.then(async res => {
				await request(app)
					.delete(`/users`)
					.set('Authorization', `Bearer ${res.body.token}`)
					.expect(200)
					.then(res => {
						expect(res.body._id).toEqual(_id)
						expect(res.body.completeName).toEqual(completeName + ' Update')
						expect(res.body.email).toEqual('testeupdate@gmail.com')
					})
			})
	})

	it('should return deleted user when delete by id', async () => {
		await createTestUser()

		await request(app)
			.delete(`/users/${_id}`)
			.set('Authorization', `Bearer ${adminToken}`)
			.expect(200)
			.then(res => {
				expect(res.body._id).toEqual(_id)
				expect(res.body.completeName).toEqual(completeName)
				expect(res.body.email).toEqual(email)
			})
	})
})
