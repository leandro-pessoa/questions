import { http } from '@/http'
import { axiosError } from './axiosError'

type PaginationResponseType<T> = {
		pageResult: T[]
		totalPages: number
		totalValues: number
		actualPage: number
		limit: number
	}

// função facilitadora utilizada no createAsyncThunk
export const asyncThunkFetchUrl = async <T>(
	url: string,
	token?: string,
	search?: {
		searchUrl: string
		searchValue: string | number
		column: string
	},
	pagination?: {
		page?: number
		limit?: number
		filters?: string
	},
) => {
	// tenta obter os dados e retorna eles
	try {
		// verifica se há alguma pesquisa e se ela é feita com base no id de um dado
		// a pesquisa é realizada utilizando uma rota sem paginação, pois é somente um valor
		if (search && search.column === '_id') {
			const res = await http.get<PaginationResponseType<T>>(
				`${url}/${search.searchValue}`,
				// caso seja necessária a autorização
				{ headers: { Authorization: token && `Bearer ${token}` } },
			)

			return res.data
		}

		// constante reutilizável da url com a paginação
		const urlWithPagination = (url: string) => {
			return `${url}?page=${pagination?.page ? pagination?.page : 1}&limit=${pagination?.limit ? pagination?.limit : 10}`
		}

		if (search) {
			const searchUrl = `${search ? `&searchValue=${search.searchValue}&column=${search.column}` : ''}`

			// a url get pode receber parâmetros de pesquisa e paginação
			const res = await http.get<PaginationResponseType<T>>( // url da requisição com a paginação, de acordo com o middleware pagination
				urlWithPagination(search.searchUrl) + searchUrl,
				// caso seja necessária a autorização
				{ headers: { Authorization: token && `Bearer ${token}` } },
			)

			return res.data
		}

		const filtersUrl = `${pagination?.filters ? `&${pagination?.filters}` : ''}`

		// a url get pode receber parâmetros de filtro e paginação
		const res = await http.get<PaginationResponseType<T>>( // url da requisição com a paginação, de acordo com o middleware pagination
			urlWithPagination(url) + filtersUrl,
			// caso seja necessária a autorização
			{ headers: { Authorization: token && `Bearer ${token}` } },
		)

		return res.data
	} catch (err) {
		// exibe o erro na tela e retorna uma reject
		axiosError(err)
		return Promise.reject()
	}
}
