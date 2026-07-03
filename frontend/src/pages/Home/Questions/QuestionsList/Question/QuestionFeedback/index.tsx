import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

import { CircleCheck, CircleX } from 'lucide-react'

import type { ReactChildren } from '@/types/ReactChildren'

interface IStyledDiv {
	readonly $correct: boolean
}

interface IQuestionFeedback {
	correct: boolean
	children: ReactChildren
}

export const StyledDiv = styled.div<IStyledDiv>`
	${flex('row', 'flex-start', 'center', '12px')}

	// muda a cor de fundo e a cor da borda de acordo com a resposta da questão (prop $correct)
	background-color: ${(props) => props.$correct ? vars.colors.green : vars.colors.red}33;
	border: 1px solid ${(props) => props.$correct ? vars.colors.green : vars.colors.red};

	border-radius: ${vars.border.radius};
	padding: 8px 12px;
	color: ${(props) => props.theme.colors.primaryFontColor};
`

const QuestionFeedback = ({ correct, children }: IQuestionFeedback) => {
	return <StyledDiv $correct={correct}>
		{
			// exibe o ícone de acordo com a resposta da questão (prop correct)
			correct ?
				<CircleCheck />
			:
				<CircleX />
		}
		{children}
	</StyledDiv>
}

export default QuestionFeedback
