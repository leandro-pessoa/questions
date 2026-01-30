import { useAppSelector } from '.'
import { selectSelectedFilters } from '../reducers/filters'

export const useFilter = () => {
	const selectedFilters = useAppSelector(selectSelectedFilters)

	// verifica se há algum filtro selecionado e retorna true ou false conforme o resultado
	const isAnyFilterSelected = selectedFilters.some(
		(filter) => filter.values.length >= 1,
	)

	return { isAnyFilterSelected }
}
