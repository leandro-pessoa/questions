import { flex } from '@/utils/flex'
import { memo } from 'react'
import styled from 'styled-components'

import Question from './Question'

import type { IQuestion } from '@/types/IQuestion'

const StyledUl = styled.ul`
	${flex('column', 'auto', 'center', '32px')}
	margin: 3% 0;
`
const QuestionsList = memo(
	function Questions(
		{questions, actualPage, limit}:
			{questions: IQuestion[] | null, actualPage: number, limit: number}
		) {
		return <StyledUl>
			{
				questions?.map((question: IQuestion, index: number) => {
					const indexPlus: number = index + 1

					return (
						<Question
							{...question}
							index={ // verifica se é a primeira página
								actualPage === 1 ?
									indexPlus // index do array + 1
								:
									// cálculo para gerar valores do restante das páginas
									(limit * (actualPage - 1)) + indexPlus
							}
							key={question._id}
						/>
					)
				})
			}
		</StyledUl>
	}
)

export default QuestionsList
