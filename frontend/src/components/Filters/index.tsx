import { useState } from 'react'
import { useAppDispatch } from '@/app/hooks'

import { StyledSection } from './styles'
import Button from '../Button'
import { FunnelPlus, ChevronUp, ChevronDown } from 'lucide-react'
import FiltersSelect from './FiltersSelect'
import SelectedFilters from './SelectedFilters'

import type { IFilter } from '@/types/IFilter'
import type { UnknownAction } from 'redux'
import type { FetchUrl } from '@/types/FetchUrl'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import type { ReactChildren } from '@/types/ReactChildren'
import { setFiltersString } from '@/app/reducers/filters'

interface IFiltersProps<T> {
	limit: number
	isAnyFilterSelected: boolean
	selectedFilters: IFilter[]
	setLimit: (arg: number) => UnknownAction
	fetchFunc: FetchUrl<T>
	children: ReactChildren
	removeSelectedFunc: ActionCreatorWithPayload<{ topic: string; value: string; displayName: string; }>
}

const Filters = <T,>({
	limit,
	selectedFilters,
	isAnyFilterSelected,
	setLimit,
	fetchFunc,
	children,
	removeSelectedFunc
}: IFiltersProps<T>) => {
	const dispatch = useAppDispatch()
	const [display, setDisplay] = useState<boolean>(false)

	const filterHandle = () => {
		let filtersString = ''

		selectedFilters.forEach(filter => {
			if (filter.values.length >= 1) {
				filtersString += `${filter.topic}=[${filter.values.map(value => `"${value}"`)}]&`
			}
		})
		dispatch(setLimit(limit))
		dispatch(setFiltersString(filtersString.slice(0, -1)))
		dispatch(fetchFunc({filters: filtersString.slice(0, -1), limit}))
	}

	return (
		<StyledSection $display={display}>
			<Button
				title='Filtros'
				backgroundColor='transparent'
				style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
				onClick={() => setDisplay(!display)}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: '4px'}}>
					<FunnelPlus />
					Filtros
				</div>
				{
					display ?
						<ChevronUp />
					:
						<ChevronDown />
				}
			</Button>
			{
				display &&
					<div className='filters__content'>
						<div className='content__selects'>
							{children}
						</div>
						<SelectedFilters
							selectedFilters={selectedFilters}
							isAnyFilterSelected={isAnyFilterSelected}
							removeSelectedFunc={removeSelectedFunc}
						/>
						<div className='content__bottom'>
							<Button
								onClick={filterHandle}
								style={{ padding: '6px 32px'}}
							>
								Filtrar
							</Button>
							<FiltersSelect
								title='Qtde resultados'
								defaultContent={['5', '10', '15', '20', '30']}
								style={{width: '210px'}}
							/>
						</div>
					</div>
			}
		</StyledSection>
	)
}

export default Filters
