import { rateLimit } from 'express-rate-limit'

// configuração do rate limit para limitar a quantidade de requisições por cliente
export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // contagem do limite dura 15 minutos
	limit: 100, // quantidade de requisições a 100 para cada 15 minutos
	standardHeaders: 'draft-8', // insere o header RateLimit
	message: 'Quantidade de requisições no período excedidas',
	legacyHeaders: false, // desabilita o header `X-RateLimit-*`
	ipv6Subnet: 60 // How many bits of IPv6 addresses to use in default keyGenerator
})
