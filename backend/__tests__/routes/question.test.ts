import request from 'supertest'
import app from '../../src/app'
import { getAdminToken } from '../testUtils/getAdminToken'
import type { IQuestion } from '../../src/types/IQuestion'

let adminToken: string

const testString = 'a'.repeat(10)

const questionId = '69169cea4b1e3b44ecffde10'

beforeAll(async () => {
	adminToken = await getAdminToken()
})

describe('Question POST', () => {
	it('should return an error if attributes is not submitted', async () => {
		await request(app)
			.post('/questions')
			.send({})
			.set('Authorization', `Bearer ${adminToken}`)
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: [
					'rightAlternative: Alternativa correta obrigatória',
					'statement: Enunciado da questão é obrigatório',
					'subject: Disciplina da questão é obrigatória',
					'wrongAlternatives: Quantidade de alternativas inválida (min: 1, max: 4)',
				]
			})
	})

	it('should return an error if attributes length is too short', async () => {
		await request(app)
			.post('/questions')
			.send({
				subject: 'a',
				statement: 'a',
				year: 1800,
				instituition: 'a',
				position: 'a',
				examiningBoard: 'a',
				wrongAlternatives: [''],
				rightAlternative: ''
			})
			.set('Authorization', `Bearer ${adminToken}`)
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: [
					'subject: O enunciado deve ter no mínimo 2 caracteres',
					'statement: O enunciado deve ter no mínimo 10 caracteres',
					'year: O ano não pode ser inferior a 1900',
					'instituition: A organização deve ter no mínimo 2 caracteres',
					'position: O cargo deve ter no mínimo 4 caracteres',
					'examiningBoard: A banca deve ter no mínimo 2 caracteres',
					'wrongAlternatives: Cada alternativa deve ter no mínimo 1 caractere',
					'rightAlternative: Alternativa correta obrigatória'
				]
			})
	})

	it('should return an error if attributes length is too long', async () => {
		const longString = 'a'.repeat(501)

		await request(app)
			.post('/questions')
			.send({
				subject: longString,
				statement: longString,
				year: 30000,
				instituition: longString,
				position: longString,
				examiningBoard: longString,
				wrongAlternatives: [longString],
				rightAlternative: longString
			})
			.set('Authorization', `Bearer ${adminToken}`)
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: [
					'subject: O enunciado deve ter no máximo 20 caracteres',
					'statement: O enunciado deve ter no máximo 500 caracteres',
					'year: O ano não pode ser superior a 2025',
					'instituition: A organização deve ter no máximo 20 caracteres',
					'position: O cargo deve ter no máximo 30 caracteres',
					'examiningBoard: A banca deve ter no máximo 15 caracteres',
					'wrongAlternatives: Cada alternativa deve ter no máximo 100 caracteres',
					'rightAlternative: A alternativa deve ter no máximo 100 caracteres'
				]
			})
	})

	it('should return the question on correct post body', async () => {
		await request(app)
			.post('/questions')
			.send({
				_id: questionId,
				subject: testString,
				statement: testString,
				year: 2020,
				instituition: testString,
				position: testString,
				examiningBoard: testString,
				wrongAlternatives: [testString, testString, testString],
				rightAlternative: testString
			})
			.set('Authorization', `Bearer ${adminToken}`)
			.set('Content-Type', 'application/json')
			.expect(201)
			.then(async res => {
				expect(res.body.subject).toEqual(testString)
				expect(res.body.statement).toEqual(testString)
				expect(res.body.year).toEqual(2020)
				expect(res.body.instituition).toEqual(testString)
				expect(res.body.examiningBoard).toEqual(testString)
				expect(res.body.wrongAlternatives).toStrictEqual([testString, testString, testString])
				expect(res.body.rightAlternative).toEqual(testString)
			})
	})
})

describe('Question GET', () => {
	it('should return json with all questions in /questions', async () => {
		await request(app)
			.get('/questions')
			.expect(200)
			.expect('Content-Type', /json/)
	})

	it('should return an error if format of id is invalid', async () => {
		await request(app)
			.get(`/questions/${questionId}aaa`)
			.expect(400, {
				status: 400,
				message: 'Requisição inválida'
			})
	})

	it('should return an error if the question is not found', async () => {
		await request(app)
			.get('/questions/69169cea4b1e3b44ecffde11')
			.expect(404, {
				status: 404,
				message: 'Valor não encontrado'
			})
	})

	it('should return the especific question by id', async () => {
		await request(app)
			.get(`/questions/${questionId}`)
			.expect(200)
			.expect('Content-Type', /json/)
			.then(res => {
				expect(res.body).toMatchObject<IQuestion>(
					{
						_id: questionId,
						subject: testString,
						statement: testString,
						year: 2020,
						instituition: testString,
						position: testString,
						examiningBoard: testString,
						wrongAlternatives: [testString, testString, testString],
						rightAlternative: testString
					}
				)
			})
	})
})

describe('Question UPDATE', () => {
	it('should return an error if format of the id is invalid', async () => {
			await request(app)
				.put('/questions/69169cea4b1e3b44ecffde11111')
				.send({ year: 2024 })
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${adminToken}`)
				.expect(400, {
					status: 400,
					message: 'Requisição inválida'
				})
	})

	it('should return an error if question is not found', async () => {
		await request(app)
			.put('/questions/69169cea4b1e3b44ecffde11')
			.send({ year: 2024 })
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${adminToken}`)
			.expect(404, {
				status: 404,
				message: 'Valor não encontrado'
			})
	})

	it('should return an error if the passed attributes are invalid', async () => {
		await request(app)
			.put(`/questions/${questionId}`)
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${adminToken}`)
			.send({
				year: 50000,
				statement: 'a',
				wrongAlternatives: []
			})
			.expect(400, {
				status: 400,
				message: [
					'wrongAlternatives: Quantidade de alternativas inválida (min: 1, max: 4)',
					'statement: O enunciado deve ter no mínimo 10 caracteres',
					'year: O ano não pode ser superior a 2025'
				]
			})
	})

	it('should return the updated question', async () => {
		await request(app)
			.put(`/questions/${questionId}`)
			.send({
				year: 2024,
				statement: 'dasdsadsadsadsadsadsa',
				subject: 'dsadsasadas',
				wrongAlternatives: ['dsadsad', 'dsadsaads']
			})
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${adminToken}`)
			.expect(200, {
				__v: 0,
				_id: questionId,
				subject: 'dsadsasadas',
				statement: 'dasdsadsadsadsadsadsa',
				year: 2024,
				instituition: testString,
				position: testString,
				examiningBoard: testString,
				wrongAlternatives: ['dsadsad', 'dsadsaads'],
				rightAlternative: testString
			})
			.expect('Content-Type', /json/)
	})
})

describe('Question DELETE', () => {
	it('should delete one question by id', async () => {
		await request(app)
			.delete(`/questions/${questionId}`)
			.set('Authorization', `Bearer ${adminToken}`)
			.expect(200)
			.then(res => {
				expect(res.body.subject).toEqual('dsadsasadas')
				expect(res.body.statement).toEqual('dasdsadsadsadsadsadsa')
				expect(res.body.year).toEqual(2024)
				expect(res.body.instituition).toEqual(testString)
				expect(res.body.examiningBoard).toEqual(testString)
				expect(res.body.wrongAlternatives).toStrictEqual(['dsadsad', 'dsadsaads'])
				expect(res.body.rightAlternative).toEqual(testString)
			})
	})
})
