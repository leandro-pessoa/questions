import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setIsLoading } from '@/app/reducers/loading'
import { setModalDisplay } from '@/app/reducers/modal'
import { selectToken } from '@/app/reducers/user'
import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { toast } from 'react-toastify'

import Button from '@/components/Button'

import type { FetchUrl } from '@/types/FetchUrl'
import type { ReactChildren } from '@/types/ReactChildren'

interface FetchButtonProps<T> {
	isModal: boolean
	httpMethod: 'get' | 'post' | 'put' | 'delete'
	url: string
	refreshFunc?: FetchUrl<T>
	children: ReactChildren
	feedbackText: string
}

const FetchButton = <T,>({
	isModal,
	httpMethod,
	url,
	refreshFunc,
	children,
	feedbackText
}: FetchButtonProps<T>) => {
	const dispatch = useAppDispatch()

	const token = useAppSelector(selectToken)

	const fetchHandle = async () => {
		try {
			// loading
			dispatch(setIsLoading(true))
			// remove uma questão baseada no id, que é enviado por props
			// necessita de administrador para realizar esta ação
			await http[httpMethod](url, {
				headers: { Authorization: token && `Bearer ${token}` },
			}).then(() => {
				if (refreshFunc) dispatch(refreshFunc({ token })) // faz um get da api com os elementos atualizados, caso queira
				toast.success(feedbackText) // feedback para o usuário
				if (isModal) dispatch(setModalDisplay(false)) // fecha o modal, caso queira
			})
		} catch (err) {
			axiosError(err)
		}
		// loading
		dispatch(setIsLoading(false))
	}

	return <Button onClick={fetchHandle}>{children}</Button>
}

export default FetchButton
