import BadRequest from '@/errors/BadRequest'
import type { Request, Response, NextFunction } from 'express'

export const pagination = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		let { limit = 10, page = 1, order = 1 } = req.query

		const result = req.result

		limit = Number(limit)
        page = Number(page)
		order = Number(order)

		if (
			typeof limit !== 'number' ||
			typeof page !== 'number' ||
			order !== 1 && order !== -1
		) {
			next(new BadRequest())
			return
		}

		if (limit > 0 && page > 0) {
			const pageResult = await result
				.find({})
				.sort({ _id: order })
				.skip((page - 1) * limit)
				.limit(limit)

			res.status(200).json(pageResult)
		} else {
			next(new BadRequest())
		}
	} catch (err) {
		next(err)
	}
}
