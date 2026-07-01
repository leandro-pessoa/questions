import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectFiltersString, setFiltersString } from '@/app/reducers/filters'

import { StyledSection } from './styles'
import Button from '../Button'
import { FunnelPlus, ChevronUp, ChevronDown, Search } from 'lucide-react'
import FiltersSelect from './FiltersSelect'
import SelectedFilters from './SelectedFilters'
import CancelSearch from '../Button/CancelSearch'

import type { IFilter } from '@/types/IFilter'
import type { UnknownAction } from 'redux'
import type { FetchUrl } from '@/types/FetchUrl'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import type { ReactChildren } from '@/types/ReactChildren'

interface IFiltersProps<T> {
	limit: number
	isAnyFilterSelected: boolean
	selectedFilters: IFilter[]
	setLimit: (arg: number) => UnknownAction
	fetchFunc: FetchUrl<T>
	children: ReactChildren
	removeSelectedFunc: ActionCreatorWithPayload<{
		topic: string
		value: string
		displayName: string
	}>
}

const Filters = <T,>({
	limit,
	selectedFilters,
	isAnyFilterSelected,
	setLimit,
	fetchFunc,
	children,
	removeSelectedFunc,
}: IFiltersProps<T>) => {
	const dispatch = useAppDispatch()
	const [display, setDisplay] = useState<boolean>(false)
	const [localLimit, setLocalLimit] = useState<number>(limit)

	const globalFiltersString = useAppSelector(selectFiltersString)

	const filterHandle = () => {
		let filtersString = ''

		// para cada filtro selecionado, irá adicionar na string filtersString o tópico e os valores
		// ex: 'subject=["Matemática", "Português"]&year=["2025"]'
		selectedFilters.forEach((filter) => {
			if (filter.values.length >= 1) {
				filtersString += `${filter.topic}=[${filter.values.map((value) => `"${value}"`)}]&`
			}
		})

		// seta o limit local, que é utilizado somente nesse componente
		dispatch(setLimit(localLimit))

		// seta a filtersString (- o & no final)
		dispatch(setFiltersString(filtersString.slice(0, -1)))

		// realiza o fetch com os filtros e o limit
		dispatch(
			fetchFunc({
				filters: filtersString.slice(0, -1),
				limit: localLimit,
			}),
		)
	}

	return (
		<StyledSection $display={display}>
			<Button
				title='Filtros'
				backgroundColor='transparent'
				className='filters__toggle-button'
				onClick={() => setDisplay(!display)}
			>
				<div className='toggle-button__wrapper'>
					<FunnelPlus />
					Filtros
				</div>
				{display ? <ChevronUp /> : <ChevronDown />}
			</Button>
			{display && (
				<div className='filters__content'>
					{
						(globalFiltersString || limit !== 10) &&
							<div style={{ marginBottom: '12px' }}>
								<CancelSearch fetchFunc={fetchFunc} />
							</div>

					}
					<div className='content__selects'>{children}</div>
					<SelectedFilters
						selectedFilters={selectedFilters}
						isAnyFilterSelected={isAnyFilterSelected}
						removeSelectedFunc={removeSelectedFunc}
					/>
					<div className='content__bottom'>
						<Button onClick={filterHandle} icon={<Search />}>
							Filtrar
						</Button>
						<FiltersSelect
							title='Qtde resultados'
							defaultContent={['5', '10', '15', '20', '30']}
							defaultSelectedValue={10}
							style={{ width: '210px' }}
							setExternalSelectedValue={setLocalLimit}
							externalSelectedValue={localLimit}
						/>
					</div>
				</div>
			)}
		</StyledSection>
	)
}

export default Filters
