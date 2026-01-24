import BadRequest from '@/errors/BadRequest'
import NotFound from '@/errors/NotFound'
import type { Request, Response, NextFunction } from 'express'

export const pagination = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		let { limit = 10, page = 1, order = 1 } = req.query

		const model = req.paginationModel
		const filters = req.paginationFilters

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
			const totalValues = await model.countDocuments(filters || null)
			const totalPages = Math.ceil(totalValues / limit)
			const pageResult = await model
				.find(filters || {})
				.sort({ _id: order })
				.skip((page - 1) * limit)
				.limit(limit)

			if (pageResult.length === 0) next(new NotFound())

			res.status(200).json({ pageResult, totalPages })
		} else {
			next(new BadRequest())
		}
	} catch (err) {
		next(err)
	}
}
