import styled from 'styled-components'
import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'

interface IStyledButtonProps {
	readonly $backgroundColor?: string
	readonly $iconButton?: boolean
}

export const StyledButton = styled.button<IStyledButtonProps>`
	${flex('row', 'center', 'center', '6px')}
	background-color: ${(props) => props.$backgroundColor || vars.colors.blue};
	color: ${(props) => props.$backgroundColor ? props.theme.colors.primaryFontColor : vars.colors.white};
	color: ${(props) => props.$iconButton && props.theme.colors.primaryFontColor};
	border-radius: ${vars.border.radius};
	padding: 8px 12px;
	border: none;

	&:hover {
		background-color: ${(props) => props.$backgroundColor || vars.colors.blue}66;
		cursor: pointer;
	}

	&:active {
		transform: translate(.5px, .5px);
	}

	${({ $iconButton = false }) => $iconButton && `
		background-color: transparent;
		border-radius: 50%;
		padding: 6px;

		&:hover {
			background-color: ${vars.colors.gray}3;
		}
	`}
`
