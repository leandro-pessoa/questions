import type { IUser } from '@/types/IUser'
import CRUDServices from './CRUDServices'
import User from '@/db/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import BaseError from '@/errors/BaseError'
import BadRequest from '@/errors/BadRequest'
import type { IAlternative } from '@/types/IAlternative'

export default class UserService extends CRUDServices<IUser> {
	constructor() {
		super(User)
	}

	async getOneByEmail(email: string) {
		return await User.findOne({ email })
	}

	async verifyLogin(user: IUser, password: string) {
		const verifyPassword = await bcrypt.compare(password ,user.passwordHash)

		if (verifyPassword) {
			const _id = user._id
			const completeName = user.completeName
			const email = user.email
			const role = user.role

			const data = { _id, completeName, email, role }
			const secretKey = process.env.TOKEN_SECRET
			if(secretKey) {
				const token = jwt.sign(data, secretKey, {expiresIn: '7d'})
				return token
			} else {
				console.error('Chave secreta do token inválida')
				throw new BaseError()
			}
		} else {
			throw new BadRequest('Credenciais inválidas', 401)
		}
	}

	async answerQuestion(
		userId: string,
		questionId: string,
		selectedOption: IAlternative,
		alternatives: IAlternative[]
	) {
		if (
			!userId ||
			!questionId ||
			!selectedOption ||
			!alternatives.some((alternative) => alternative.text === selectedOption.text)
		) {
			throw new BadRequest()
		}

		const user = await User.findById(userId)

		const isAlreadyAnswered =
			user?.answeredQuestions?.find(
				(value) => value.questionId === questionId
			)

		if(!isAlreadyAnswered) {
			await User.updateOne(
				{ _id: userId },
				{
					$push: {
						answeredQuestions: {
							questionId,
							selectedOption,
							isCorrectAnswer: selectedOption.right
						}
					}
				})
		} else {
			await User.updateOne(
				{ 'answeredQuestions.questionId': questionId },
				{
					$set: {
						'answeredQuestions.$.questionId': questionId,
						'answeredQuestions.$.selectedOption': selectedOption,
						'answeredQuestions.$.isCorrectAnswer': selectedOption.right
					}
				},
				{
					arrayFilters: [{'answeredQuestion.questionId': questionId}]
				}
			)
		 }
	}
}
