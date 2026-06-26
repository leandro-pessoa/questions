import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectCrudSearchColumn, selectCrudSearchLimit, selectCrudSearchValue, setCrudSearchColumn, setCrudSearchLimit, setCrudSearchValue } from '@/app/reducers/crudSearch'
import { selectToken } from '@/app/reducers/user'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { StyledForm } from './styles'
import Button from '@/components/Button'
import FiltersSelect from '@/components/Filters/FiltersSelect'
import Input from '@/components/Input'
import { Search } from 'lucide-react'
import CancelSearch from '@/components/Button/CancelSearch'

import type { FetchUrl } from '@/types/FetchUrl'

interface ICrudFilters<T> {
	fetchFunc: FetchUrl<T>
	data: { _id: string }[]
	searchUrl: string
}

const CrudFilters = <T,>({ fetchFunc, data, searchUrl }: ICrudFilters<T>) => {
	const dispatch = useAppDispatch()
	const token = useAppSelector(selectToken)

	const globalSearchLimit = useAppSelector(selectCrudSearchLimit)
	const globalSearchColumn = useAppSelector(selectCrudSearchColumn)
	const globalSearchValue = useAppSelector(selectCrudSearchValue)

	const [searchColumn, setSearchColumn] = useState<string>(globalSearchColumn || '')
	const [searchLimit, setSearchLimit] = useState<number>(globalSearchLimit || 10)
	const [searchValue, setSearchValue] = useState<string>('')

	const search = {
		searchUrl,
		searchValue,
		column: searchColumn
	}

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
			<div className='filters-header'>
				<FiltersSelect
					title='Quantidade'
					defaultContent={['5', '10', '15', '20', '30']}
					className='filters-header__select-quantity'
					noLabels={true}
					setExternalSelectedValue={setSearchLimit}
					externalSelectedValue={searchLimit || globalSearchLimit}
				/>
				{
					globalSearchValue &&
						<CancelSearch
							fetchFunc={fetchFunc}
							className='filters-header__cancel-search'
						/>
				}
			</div>
			<div className='search'>
				<FiltersSelect
					title='Coluna'
					defaultContent={Object.keys(data[0])}
					noLabels={true}
					className='search__select-column'
					setExternalSelectedValue={setSearchColumn}
					externalSelectedValue={searchColumn || globalSearchColumn}
				/>
				<Input
					className='search__search-input'
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
