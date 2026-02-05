import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectLimit, selectSelectedFilters } from '@/app/reducers/filters'
import { fetchQuestions } from '@/app/reducers/question'
import { useFilter } from '@/app/hooks/useFilter'
import { toast } from 'react-toastify'

import { StyledSection } from './styles'
import Button from '../Button'
import { FunnelPlus, ChevronUp, ChevronDown } from 'lucide-react'
import FiltersSelect from './FiltersSelect'
import SelectedFilters from './SelectedFilters'

const Filters = () => {
	const dispatch = useAppDispatch()
	const selectedFilters = useAppSelector(selectSelectedFilters)
	const limit = useAppSelector(selectLimit)
	const [display, setDisplay] = useState<boolean>(false)
	const { isAnyFilterSelected } = useFilter()

	const filterHandle = () => {
		if (!isAnyFilterSelected && limit === 10) {
			toast.error('Selecione ao menos um filtro!')
			return
		}

		let filtersString = ''

		selectedFilters.forEach(filter => {
			if (filter.values.length >= 1) {
				filtersString += `${filter.topic}=[${filter.values.map(value => `"${value}"`)}]&`
			}
		})
		dispatch(fetchQuestions({filters: filtersString.slice(0, -1), limit}))
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
			<div className='filters__content'>
				<div className='content__selects'>
					<FiltersSelect title='Disciplina' topicFetchUrl='subject' type='checkbox'/>
					<FiltersSelect title='Ano' topicFetchUrl='year' type='checkbox'/>
					<FiltersSelect title='Organização' topicFetchUrl='instituition' type='checkbox'/>
					<FiltersSelect title='Cargo' topicFetchUrl='position' type='checkbox'/>
					<FiltersSelect title='Banca' topicFetchUrl='examiningBoard' type='checkbox'/>
				</div>
				<SelectedFilters />
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
		</StyledSection>
	)
}

export default Filters
