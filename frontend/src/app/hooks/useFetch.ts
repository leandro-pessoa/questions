import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectIsLoading, setIsLoading } from '@/app/reducers/loading'
import { clearModal, setModalType } from '@/app/reducers/modal'
import { selectToken } from '@/app/reducers/user'
import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import type { FetchUrl } from '@/types/FetchUrl'
import type { AxiosResponse } from 'axios'

interface UseFetchProps<T> {
	isModal?: boolean
	httpMethod: 'get' | 'post' | 'put' | 'delete'
	url: string
	refreshFunc?: FetchUrl<T>
	feedbackText?: string
	navigateTo?: string
	then?: (res: AxiosResponse) => void
	data?: T
	globalLoading?: boolean
	localLoadingFunc?: (value: React.SetStateAction<boolean>) => void
	throwError?: boolean
	catchFunc?: () => void
}

export const useFetch = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const token = useAppSelector(selectToken)
	const isLoading = useAppSelector(selectIsLoading)

	const fetchHandle = async <T,>(
		{
			isModal = false,
			httpMethod,
			url,
			refreshFunc,
			feedbackText,
			navigateTo,
			then,
			data,
			globalLoading,
			localLoadingFunc,
			catchFunc
		}: UseFetchProps<T>
	) => {
		// será executada após uma requisição
		const finalThen = () => {
			if (refreshFunc) dispatch(refreshFunc({ token })) // faz um get da api com os elementos atualizados, caso queira
			if(feedbackText) toast.success(feedbackText) // feedback para o usuário
			if (isModal) { // fecha e limpa os dados do modal, caso queira
				dispatch(clearModal())
				dispatch(setModalType(''))
			}
			if (navigateTo) navigate(navigateTo) // navega para a página informada, caso queira

			// desativa os loadings
			if (globalLoading) dispatch(setIsLoading(false))
			if (localLoadingFunc) localLoadingFunc(false)
		}

		// caso esteja carregando, não executa o restante da função
		if (isLoading) return

		try {
			// loading
			if (globalLoading) dispatch(setIsLoading(true))
			if (localLoadingFunc) localLoadingFunc(true)

			// caso seja http post ou put (que cotenha o atributo data)
			if (httpMethod === 'post' || httpMethod === 'put') {
				const res = await http[httpMethod](
					url,
					{ ...data },
					{
						headers: { Authorization: token && `Bearer ${token}` },
					},
				)
					.then(then)
					.then(finalThen)
				return res
			}

			// demais requisições (get, delete)
			const res = await http[httpMethod](url, {
				headers: { Authorization: token && `Bearer ${token}` },
			})
				.then(then)
				.then(finalThen)

			return res
		} catch (err) {
			axiosError(err)
			if (catchFunc) catchFunc()
		}
		// loading
		if (globalLoading) dispatch(setIsLoading(false))
		if (localLoadingFunc) localLoadingFunc(false)
	}

	return { fetchHandle }
}
