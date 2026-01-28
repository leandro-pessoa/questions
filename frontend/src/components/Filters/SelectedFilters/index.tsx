import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { StyledDiv } from './styles'
import {
	selectSelectedFilters,
	toggleCheckboxFilter,
} from '@/app/reducers/filters'
import Button from '@/components/Button'
import { CircleX } from 'lucide-react'

const SelectedFilters = () => {
	const dispatch = useAppDispatch()
	const selectedFilters = useAppSelector(selectSelectedFilters)

	return (
		<StyledDiv>
			<ul>
				{selectedFilters.map((filter) => {
					if (filter.values.length >= 1) {
						return (
							<li>
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
