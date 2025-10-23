import CRUDServices from '@/services/CRUDServices.js'
import type { Request, Response, NextFunction } from 'express'

export default class Controller<T> {
	constructor(public serviceEntity: CRUDServices<T>) {}

	async index(req: Request, res: Response, next: NextFunction) {
		try {
			const values = await this.serviceEntity.getAll()
			return res.status(200).json(values)
		} catch (err) {
			next(err)
		}
	}

	async show(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params

		try {
			const value = await this.serviceEntity.getById(id as string)
			if (value!.length >= 1) {
				return res.status(200).json(value)
			} else {
				next()
			}
		} catch (err) {
			next(err)
		}
	}

	async store(req: Request, res: Response, next: NextFunction) {
		try {
			const newValue = await this.serviceEntity.addOne(req.body)
			return res.status(200).json(newValue)
		} catch (err) {
			next(err)
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params

		try {
			const value = await this.serviceEntity.getById(id as string)
			if (value!.length >= 1) {
				await this.serviceEntity.updateOne(id as string, req.body)
				const updatedValue = await this.serviceEntity.getById(id as string)
				return res.status(200).json(updatedValue)
			} else {
				next()
			}

		} catch (err) {
			next(err)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const { id } = req.body

		try {
			const value = await this.serviceEntity.getById(id as string)
			if (value!.length >= 1) {
				await this.serviceEntity.deleteOne(id as string)
				return res.status(200).json(value)
			} else {
				next()
			}
		} catch (err) {
			next(err)
		}
	}
}
