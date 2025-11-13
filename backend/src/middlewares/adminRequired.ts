import BadRequest from "@/errors/BadRequest"
import type { Request, Response, NextFunction } from "express"

export const adminRequired = (req: Request, res: Response, next: NextFunction) => {
	if (req.role === 'default') {
		next(new BadRequest('Acesso negado', 401))
		return
	}

	return next()
}
