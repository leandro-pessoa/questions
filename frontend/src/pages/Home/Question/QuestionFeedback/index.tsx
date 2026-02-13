import { vars } from '@/styles/vars'
import styled from 'styled-components'
import { CircleCheck, CircleX } from 'lucide-react'
import { flex } from '@/utils/flex'

interface IStyledDiv {
	readonly $correct: boolean
}

interface IQuestionFeedback {
	correct: boolean
	children: React.ReactNode | string | [React.ReactNode | string][]
}

export const StyledDiv = styled.div<IStyledDiv>`
	${flex('row', 'flex-start', 'center', '12px')}
	background-color: ${(props) => props.$correct ? vars.colors.green : vars.colors.red}33;
	border: 1px solid ${(props) => props.$correct ? vars.colors.green : vars.colors.red};
	border-radius: ${vars.border.radius};
	padding: 8px 12px;
	color: ${(props) => props.theme.colors.primaryFontColor};
`

const QuestionFeedback = ({ correct, children }: IQuestionFeedback) => {
	return <StyledDiv $correct={correct}>
		{
			correct ?
				<CircleCheck />
			:
				<CircleX />
		}
		{children}
	</StyledDiv>
}

export default QuestionFeedback
