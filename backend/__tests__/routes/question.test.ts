import request from 'supertest'
import app from '../../src/app'
import { getAdminToken } from '../testUtils/getAdminToken'
import type { IQuestion } from '../../src/types/IQuestion'

let adminToken: string

const testString = 'a'.repeat(10)
const testAlternatives = [
	{_id: '69169cea4b1e3b44ecffde16', right: false, text: 'das', letter: 'C'},
	{_id: '69169cea4b1e3b44ecffde12', right: true, text: 'dsa', letter: 'E'}
] as IQuestion['alternatives']

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
					'statement: Enunciado da questão é obrigatório',
					'subject: Disciplina da questão é obrigatória',
					'alternatives: Quantidade de alternativas inválida (min: 2, max: 5)'
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
				alternatives: [
					{right: false, text: '', letter: 'C'},
					{right: true, text: 'dsa', letter: 'E'}
				]
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
					'alternatives: Cada alternativa deve ter no mínimo 1 caractere',
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
				alternatives: [
					{right: false, text: longString, letter: 'C'},
					{right: true, text: 'dsa', letter: 'E'}
				]
			})
			.set('Authorization', `Bearer ${adminToken}`)
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: [
					'subject: O enunciado deve ter no máximo 20 caracteres',
					'statement: O enunciado deve ter no máximo 500 caracteres',
					`year: O ano não pode ser superior a ${new Date().getFullYear()}`,
					'instituition: A organização deve ter no máximo 20 caracteres',
					'position: O cargo deve ter no máximo 30 caracteres',
					'examiningBoard: A banca deve ter no máximo 15 caracteres',
					'alternatives: Cada alternativa deve ter no máximo 100 caracteres'
				]
			})
	})

	it('should return an error if question dont have a correct answer', async () => {
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
				alternatives: [
					{right: false, text: 'asas', letter: 'C'},
					{right: false, text: 'dsa', letter: 'E'}
				]
			})
			.set('Authorization', `Bearer ${adminToken}`)
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: ['alternatives: Deve haver uma alternativa correta']
			})
	})

	it('should return an error if question have two correct answers', async () => {
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
				alternatives: [
					{right: true, text: 'asas', letter: 'C'},
					{right: true, text: 'dsa', letter: 'E'}
				]
			})
			.set('Authorization', `Bearer ${adminToken}`)
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: ['alternatives: Não pode haver mais de uma alternativa correta']
			})
	})

	it('should return an error if question letter dont is: A, B, C, D or E', async () => {
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
				alternatives: [
					{right: false, text: 'asas', letter: 'C'},
					{right: true, text: 'dsa', letter: 'Z'}
				]
			})
			.set('Authorization', `Bearer ${adminToken}`)
			.set('Content-Type', 'application/json')
			.expect(400, {
				status: 400,
				message: ['alternatives: A letra de cada alternativa deve ser: A, B, C, D ou E']
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
				alternatives: testAlternatives
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
				expect(res.body.alternatives).toEqual(testAlternatives)
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

	it('should return an error if filtered questions is not found', async () => {
		await request(app)
			.get('/filteredQuestions?year=["2200"]&subject=["Matemática", "Português"]')
			.expect(404, {
				status: 404,
				message: 'Questões inexistentes com esses filtros'
			})
	})

	it('should return an error if url query is invalid', async () => {
		await request(app)
			.get('/filteredQuestions?year=["2025", "2026"]&subject=["Matemática')
			.expect(500, {
				status: 500,
				message: 'Erro interno do servidor'
			})
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

	it('should return an bad request error if selectedColumn is not sent',async () => {
		await request(app)
			.get('/column?selectedColumn=')
			.expect(400, {
				status: 400,
				message: 'Requisição inválida'
			})
	})

	it('should return filtered questions if url query is valid and found a question', async () => {
		await request(app)
			.get('/filteredQuestions?year=["2026"]&subject=["Matemática"]')
			.expect('Content-Type', /json/)
			.then(res => {
				expect(res.body[0].subject).toEqual('Matemática')
				expect(res.body[0].year).toEqual(2026)
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
						alternatives: testAlternatives
					}
				)
			})
	})

	it('should return the values of the column', async () => {
		await request(app)
			.get('/column?selectedColumn=subject')
			.expect(200)
			.then(res => {
				expect(res.body.length).toBeGreaterThanOrEqual(1)
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
				alternatives: []
			})
			.expect(400, {
				status: 400,
				message: [
					'alternatives: Quantidade de alternativas inválida (min: 2, max: 5)',
					'statement: O enunciado deve ter no mínimo 10 caracteres',
					`year: O ano não pode ser superior a ${new Date().getFullYear()}`
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
				alternatives: [
					...testAlternatives,
					{_id: '694eed8915ebefa67c167636', right: false, text: 'dsadas', letter: 'A'}
				]
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
				alternatives: [
					...testAlternatives,
					{_id: '694eed8915ebefa67c167636', right: false, text: 'dsadas', letter: 'A'}
				]
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
				expect(res.body.alternatives).toEqual([
					...testAlternatives,
					{_id: '694eed8915ebefa67c167636', right: false, text: 'dsadas', letter: 'A'}
				])
			})
	})
})
