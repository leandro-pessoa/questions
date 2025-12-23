import { flex } from '@/utils/flex'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
	fetchQuestions,
	selectQuestions,
	selectQuestionsStatus,
} from '@/app/reducers/question'

import Question from '..'
import { Loading } from '@/components/Loading'
import { CenterContainer } from '@/components/CenterContainer'
import Button from '@/components/Button'
import { RotateCcw } from 'lucide-react'

import type { IQuestion } from '@/types/IQuestion'
import { shuffleArray } from '@/utils/shuffleArray'

const StyledUl = styled.ul`
	${flex('column', 'auto', 'center', '16px')}
	margin: 3% 0;
`

const QuesitonsList = () => {
	const dispatch = useAppDispatch()
	const questionsFetchStatus = useAppSelector(selectQuestionsStatus)
	const questions = useAppSelector(selectQuestions)

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
					<StyledUl>
						{
							questions?.map((question: IQuestion) => {
								const randomAlternatives = shuffleArray([
									...question.wrongAlternatives,
									question.rightAlternative,
								])

								return (
									<Question
										{...question}
										randomAlternatives={randomAlternatives}
									/>
								)
							})
						}
					</StyledUl>
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

	return renderQuestions()
}

export default QuesitonsList
