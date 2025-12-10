import styled from 'styled-components'
import { vars } from '@/styles/vars'

interface IStyledButtonProps {
	backgroundColor?: string
}

export const StyledButton = styled.button<IStyledButtonProps>`
	display: flex;
	align-items: center;
	gap: 6px;
	background-color: ${(props) => props.backgroundColor || vars.colors.blue};
	color: ${(props) => props.theme.colors.primaryFontColor};
	border-radius: ${vars.border.radius};
	padding: 8px 12px;
	border: none;

	&:hover {
		background-color: ${(props) => props.backgroundColor || vars.colors.blue}dd;
		cursor: pointer;
	}

	&:active {
		transform: translate(.5px, .5px);
	}
`
