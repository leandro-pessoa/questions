import { vars } from '@/styles/vars'
import styled from 'styled-components'

interface IInputProps {
	readonly $error?: boolean
}

const xPadding = 14

const Input = styled.input<IInputProps>`
	background-color: ${(props) => props.theme.colors.primaryBackgroundColor};
	border: 1px solid ${(props) => props.$error ? vars.colors.red : props.theme.colors.primaryBorderColor};
	color: ${(props) => props.theme.colors.primaryFontColor};
	border-radius: ${vars.border.radius};
	padding: 6px ${xPadding}px;
	width: calc(100% - ${xPadding * 2}px);

	&:hover {
		transition: ease .1s;
		border-color: ${vars.colors.mediumGray};
	}

	&:focus {
		outline: 3px solid ${vars.colors.blue}aa;
	}
`

export default Input
