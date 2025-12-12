import styled from 'styled-components'
import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'

interface IStyledButtonProps {
	backgroundColor?: string
}

export const StyledButton = styled.button<IStyledButtonProps>`
	${flex('row', 'center', 'center', '6px')}
	background-color: ${(props) => props.backgroundColor || vars.colors.blue};
	color: ${(props) => props.backgroundColor ? props.theme.colors.primaryFontColor : vars.colors.white};
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
