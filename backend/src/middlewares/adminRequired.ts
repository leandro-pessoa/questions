import BadRequest from '@/errors/BadRequest'

import type { Request, Response, NextFunction } from 'express'

// verifica se o usuário tem a role de administrador
// esse middleware tem que ser posicionado antes do controller na rota
export const adminRequired = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.role === 'default') { // caso não tenha, retorna o erro 401
		next(new BadRequest('Acesso negado', 401))
		return
	}
	// caso tenha, passa para o próximo elemento da requisição
	return next()
}
