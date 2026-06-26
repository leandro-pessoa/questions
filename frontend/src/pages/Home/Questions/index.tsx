import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
	fetchQuestions,
	selectActualPage,
	selectFetchLimit,
	selectQuestions,
	selectQuestionsStatus,
	selectTotalQuestionPages
} from '@/app/reducers/question'
import { selectFiltersString, selectLimit, selectSelectedFilters, setLimit, toggleCheckboxFilter, clearFilters } from '@/app/reducers/filters'
import { useFilter } from '@/app/hooks/useFilter'
import { useLocation } from 'react-router-dom'

import { Loading } from '@/components/Loading'
import { CenterContainer } from '@/components/CenterContainer'
import Button from '@/components/Button'
import { RotateCcw } from 'lucide-react'
import Pagination from '@/components/Pagination'
import Filters from '@/components/Filters'
import QuestionsList from './QuestionsList'
import FiltersSelect from '@/components/Filters/FiltersSelect'

const Questions = () => {
	const dispatch = useAppDispatch()
	const questionsFetchStatus = useAppSelector(selectQuestionsStatus)
	const questions = useAppSelector(selectQuestions)
	const totalQuestionPages = useAppSelector(selectTotalQuestionPages)
	const actualPage = useAppSelector(selectActualPage)
	const limit = useAppSelector(selectLimit)
	const selectedFilters = useAppSelector(selectSelectedFilters)
	const fetchLimit = useAppSelector(selectFetchLimit)
	const filtersString = useAppSelector(selectFiltersString)

	const { isAnyFilterSelected } = useFilter()
	const { pathname } = useLocation()

	useEffect(() => {
		const questionsPages = ['/', '/admin/questoes']
		// limpa todos os filtros e faz um novo fetch nas questions quando a nova página atual estiver contida em questionsPages
		if (questionsPages.includes(pathname)) {
			dispatch(fetchQuestions())
			dispatch(clearFilters())
		}
	}, [dispatch, pathname])

	const renderQuestions = () => {
		switch (questionsFetchStatus) {
			case 'pending':
				return (
					<CenterContainer $height='header'>
						<Loading>
							<div></div>
						</Loading>
					</CenterContainer>
				)
			case 'succeeded':
				return (
					<>
						<Filters
							limit={limit}
							isAnyFilterSelected={isAnyFilterSelected}
							selectedFilters={selectedFilters}
							setLimit={setLimit}
							fetchFunc={fetchQuestions}
							removeSelectedFunc={toggleCheckboxFilter}
						>
							<FiltersSelect title='Disciplina' topicFetchUrl='subject' type='checkbox'/>
							<FiltersSelect title='Ano' topicFetchUrl='year' type='checkbox'/>
							<FiltersSelect title='Organização' topicFetchUrl='instituition' type='checkbox'/>
							<FiltersSelect title='Cargo' topicFetchUrl='position' type='checkbox'/>
							<FiltersSelect title='Banca' topicFetchUrl='examiningBoard' type='checkbox'/>
						</Filters>
						<QuestionsList
							questions={questions}
							actualPage={actualPage}
							limit={fetchLimit}
						/>
						<Pagination
							fetchFunc={fetchQuestions}
							totalPages={totalQuestionPages}
							limit={limit}
							actualPage={actualPage}
							filters={filtersString}
						/>
					</>
				)
			case 'failed':
				return (
					<CenterContainer $height='header'>
						<h2>Falha ao tentar carregar as questões</h2>
						<br />
						<Button onClick={() => dispatch(fetchQuestions())}>
							<RotateCcw />
							Recarregar
						</Button>
					</CenterContainer>
				)
		}
	}

	return (
		<>
			{renderQuestions()}
		</>
	)
}

export default Questions
