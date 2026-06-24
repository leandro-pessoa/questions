import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { clearCrudFilters, setCrudSearchColumn, setCrudSearchLimit, setCrudSearchValue } from '@/app/reducers/crudSearch'
import { selectToken } from '@/app/reducers/user'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { StyledForm } from './styles'
import Button from '@/components/Button'
import FiltersSelect from '@/components/Filters/FiltersSelect'
import Input from '@/components/Input'
import { Search } from 'lucide-react'

import type { FetchUrl } from '@/types/FetchUrl'

interface ICrudFilters<T> {
	fetchFunc: FetchUrl<T>
	data: { _id: string }[]
	searchUrl: string
}

const CrudFilters = <T,>({ fetchFunc, data, searchUrl }: ICrudFilters<T>) => {
	const dispatch = useAppDispatch()
	const token = useAppSelector(selectToken)

	const { pathname } = useLocation()

	const [searchColumn, setSearchColumn] = useState<string>('')
	const [searchLimit, setSearchLimit] = useState<number>(10)
	const [searchValue, setSearchValue] = useState<string>('')

	const search = {
		searchUrl,
		searchValue,
		column: searchColumn
	}

	useEffect(() => {
		const adminPages = ['/admin/questoes', '/admin/usuarios']

		if (adminPages.includes(pathname)) {
			dispatch(clearCrudFilters())
		}
	}, [dispatch, pathname])

	const searchHandle = () => {
		if (searchValue === '') {
			toast.error('Insira um valor de pesquisa')
			return
		}

		if (!searchColumn) {
			toast.error('Insira a coluna de pesquisa')
			return
		}

		dispatch(setCrudSearchColumn(searchColumn))
		dispatch(setCrudSearchLimit(searchLimit))
		dispatch(setCrudSearchValue(searchValue))
		dispatch(
			fetchFunc({
				search,
				limit: Number(searchLimit),
				token,
			}),
		)
	}

	return (
		<StyledForm onSubmit={searchHandle}>
			<FiltersSelect
				title='Quantidade'
				defaultContent={['5', '10', '15', '20', '30']}
				className='select-quantity'
				setExternalSelectedValue={setSearchLimit}
			/>
			<div className='search'>
				<FiltersSelect
					title='Coluna'
					defaultContent={Object.keys(data[0])}
					noLabels={true}
					className='select-column'
					setExternalSelectedValue={setSearchColumn}
				/>
				<Input
					className='search-input'
					placeholder='Pesquisar'
					style={{ padding: '10px 16px' }}
					onChange={(e) => setSearchValue(e.target.value)}
					value={searchValue}
				/>
				<Button type='submit'>
					<Search />
				</Button>
			</div>
		</StyledForm>
	)
}

export default CrudFilters
