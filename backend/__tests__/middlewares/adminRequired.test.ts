import request from "supertest"
import app from "../../src/app"
import { createTestUser, deleteTestUser, login, email, password } from "../testUtils/testUsers"
import { getAdminToken } from "../testUtils/getAdminToken"

let adminToken: string

describe('adminRequired tests', () => {
	beforeAll(async () => {
		await createTestUser()
		adminToken = await getAdminToken()
	})

	afterAll(async () => {
		await deleteTestUser(adminToken)
	})

	it('should return an error if default user try to access admin user functionality', async () => {
		await login(email, password)
			.then(async res => {
				await request(app)
					.get('/users')
					.set('Authorization', `Bearer ${res.body.token}`)
					.expect(401, {
						status: 401,
						message: 'Acesso negado'
					})
			})
	})
})
