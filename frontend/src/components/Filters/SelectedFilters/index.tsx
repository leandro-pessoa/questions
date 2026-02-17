import { useAppDispatch } from '@/app/hooks'

import { StyledDiv } from './styles'
import Button from '@/components/Button'
import { CircleX } from 'lucide-react'

import type { IFilter } from '@/types/IFilter'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface ISelectedFiltersProps {
	selectedFilters: IFilter[]
	isAnyFilterSelected: boolean
	removeSelectedFunc: ActionCreatorWithPayload<{ topic: string; value: string; displayName: string; }>
}

const SelectedFilters = ({ selectedFilters, isAnyFilterSelected, removeSelectedFunc }: ISelectedFiltersProps) => {
	const dispatch = useAppDispatch()

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
									<span className='filters__value' key={value}>
										{value}
										<Button
											iconButton
											onClick={() =>
												dispatch(
													removeSelectedFunc({
														topic: filter.topic,
														value,
														displayName:
															filter.displayName,
													})
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
