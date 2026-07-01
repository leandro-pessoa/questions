import { vars } from '@/styles/vars'
import styled from 'styled-components'

interface IInputProps {
	readonly $error?: boolean
	readonly $width?: 'auto' | 'hundredPercent'
}

const xPadding = 14

const Input = styled.input<IInputProps>`
	background-color: ${(props) => props.theme.colors.primaryBackgroundColor};

	// caso haja um erro, a borda do input ficará vermelha
	border: 1px solid ${(props) => props.$error ? vars.colors.red : props.theme.colors.primaryBorderColor};

	color: ${(props) => props.theme.colors.primaryFontColor};

	// border radius global
	border-radius: ${vars.border.radius};

	// padding horizontal
	padding: 6px ${xPadding}px;

	// atribui uma width de 100%, de acordo com a prop hundredPercent
	width: ${
		({ $width = 'hundredPercent'}) =>
			$width === 'auto' ? 'auto' : `calc(100% - ${xPadding * 2}px)`
	};

	&:hover {
		transition: ease .1s;
		border-color: ${vars.colors.mediumGray};
	}

	&:focus {
		outline: 3px solid ${vars.colors.blue}aa;
	}
`

export default Input
