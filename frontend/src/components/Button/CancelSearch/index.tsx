import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { clearFilters } from '@/app/reducers/filters'
import { clearCrudFilters } from '@/app/reducers/crudSearch'
import { selectToken } from '@/app/reducers/user'

import { X } from 'lucide-react'
import Button from '..'

import type { FetchUrl } from '@/types/FetchUrl'

interface ICancelSearch<T> {
	fetchFunc: FetchUrl<T>
	className?: string
}

const CancelSearch = <T,>({ fetchFunc, className }: ICancelSearch<T>) => {
	const dispatch = useAppDispatch()
	const token = useAppSelector(selectToken)

	const clickHandle = () => {
		// limpa todos os tipos de filtros aplicados
		// depois, executa uma função de fetch para buscar os novos dados
		dispatch(clearFilters())
		dispatch(clearCrudFilters())
		dispatch(fetchFunc({ token }))
	}

	return (
		<Button
			icon={<X />}
			onClick={clickHandle}
			className={className}
		>
			Pesquisa
		</Button>
	)
}

export default CancelSearch
