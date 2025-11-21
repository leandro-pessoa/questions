import request from 'supertest'
import app from '../../src/app'

export const testUserData = {
	_id: '69169cea4b1e3b44ecffde92',
	completeName: 'Teste',
	email: 'teste@gmail.com',
	password: '123@Tes',
}
export const { _id, completeName, email, password } = testUserData

export const createTestUser = async () => {
	await request(app)
		.post('/users')
		.send(testUserData)
		.set('Content-Type', 'application/json')
}

export const login = async (email: string, password: string) => {
	return await request(app)
		.post('/users/login')
		.send({email, password})
		.set('Content-Type', 'application/json')
}

export const deleteTestUser = async (adminToken: string) => {
	await request(app)
		.delete(`/users/${_id}`)
		.set('Authorization', `Bearer ${adminToken}`)
}
