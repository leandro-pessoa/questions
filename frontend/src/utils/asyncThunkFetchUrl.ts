import { http } from '@/http'
import { axiosError } from './axiosError'

// função facilitadora utilizada no createAsyncThunk
export const asyncThunkFetchUrl = async <T>(url?: string, token?: string, pagination?: {
	page?: number
	limit?: number
	filters?: string
}) => {
	// tenta obter os dados e retorna eles
	try {
		// a url get pode receber parâmetros de filtro e paginação
		const res = await http.get<{
			pageResult: T[]
			totalPages: number
			totalValues: number
			actualPage: number
			limit: number
		}>( // url da requisição com a paginação, de acordo com o middleware pagination
			`${url}?page=${pagination?.page ? pagination?.page : 1}&limit=${pagination?.limit ? pagination?.limit : 10}${pagination?.filters ? `&${pagination?.filters}` : ''}`,
			// caso seja necessária a autorização
			{ headers: { Authorization: token && `Bearer ${token}`}}
		)

		return res.data
	} catch (err) {
		// exibe o erro na tela e retorna uma reject
		axiosError(err)
		return Promise.reject()
	}
}
