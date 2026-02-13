import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
	selectSelectedFilters,
	toggleCheckboxFilter,
} from '@/app/reducers/filters'
import { useFilter } from '@/app/hooks/useFilter'

import { StyledDiv } from './styles'
import Button from '@/components/Button'
import { CircleX } from 'lucide-react'

const SelectedFilters = () => {
	const dispatch = useAppDispatch()
	const selectedFilters = useAppSelector(selectSelectedFilters)
	const { isAnyFilterSelected } = useFilter()

	return (
		<StyledDiv style={{ display: isAnyFilterSelected ? 'block' : 'none'}}>
			<ul>
				{selectedFilters.map((filter) => {
					if (filter.values.length >= 1) {
						return (
							<li key={filter.displayName}>
								<span className='filters__topic'>
									{filter.displayName}
								</span>
								:{' '}
								{filter.values.map((value) => (
									<span className='filters__value'>
										{value}
										<Button
											iconButton
											onClick={() =>
												dispatch(
													toggleCheckboxFilter({
														topic: filter.topic,
														value,
														displayName:
															filter.displayName,
													}),
												)
											}
										>
											<CircleX />
										</Button>
									</span>
								))}
							</li>
						)
					}

					return ''
				})}
			</ul>
		</StyledDiv>
	)
}

export default SelectedFilters
