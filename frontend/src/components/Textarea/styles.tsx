import { vars } from '@/styles/vars'
import styled from 'styled-components'

interface ITextareaProps {
	readonly $error?: boolean
}

const xPadding = 14

export const StyledTextarea = styled.textarea<ITextareaProps>`
	background-color: transparent;
	border-radius: ${vars.border.radius};
	color: ${(props) => props.theme.colors.primaryFontColor};

	// de acordo com a prop $error, a borda ficará na cor vermelha
	border: 1px solid ${(props) => props.$error ? vars.colors.red : props.theme.colors.primaryBorderColor};

	font-family: ${vars.fonts.primaryFont};
	resize: none;

	// utilização da constante xPadding
	width: calc(100% - ${xPadding * 2}px);
	padding: 6px ${xPadding}px;
	
	height: 100px;

	&:hover {
		transition: ease .1s;
		border-color: ${vars.colors.mediumGray};
	}

	&:focus {
		outline: 3px solid ${vars.colors.blue}aa;
	}
`
