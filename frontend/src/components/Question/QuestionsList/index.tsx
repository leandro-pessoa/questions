import { flex } from '@/utils/flex'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
	fetchQuestions,
	selectQuestions,
	selectQuestionsStatus,
	selectTotalQuestionPages,
} from '@/app/reducers/question'

import Question from '..'
import { Loading } from '@/components/Loading'
import { CenterContainer } from '@/components/CenterContainer'
import Button from '@/components/Button'
import { RotateCcw } from 'lucide-react'
import Pagination from '@/components/Pagination'
import Filters from '@/components/Filters'

import type { IQuestion } from '@/types/IQuestion'

const StyledUl = styled.ul`
	${flex('column', 'auto', 'center', '32px')}
	margin: 3% 0;
`

const QuestionsList = () => {
	const dispatch = useAppDispatch()
	const questionsFetchStatus = useAppSelector(selectQuestionsStatus)
	const questions = useAppSelector(selectQuestions)
	const totalQuestionPages = useAppSelector(selectTotalQuestionPages)

	useEffect(() => {
		dispatch(fetchQuestions())
	}, [dispatch])

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
						<Filters />
						<StyledUl>
							{
								questions?.map((question: IQuestion, index) => {
									return (
										<Question
											{...question}
											index={index}
											key={question._id}
										/>
									)
								})
							}
						</StyledUl>
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
			<Pagination fetchFunc={fetchQuestions} totalPages={totalQuestionPages} limit={10}/>
		</>
	)

}

export default QuestionsList
