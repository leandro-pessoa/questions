import { useAppSelector } from '.'
import { selectSelectedFilters } from '../reducers/filters'

export const useFilter = () => {
	const selectedFilters = useAppSelector(selectSelectedFilters)

	const isAnyFilterSelected = selectedFilters.some(
		(filter) => filter.values.length >= 1,
	)

	return { isAnyFilterSelected }
}
