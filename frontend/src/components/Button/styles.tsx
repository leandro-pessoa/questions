import styled from 'styled-components'
import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'

interface IStyledButtonProps {
	readonly $backgroundColor?: string
	readonly $iconButton?: boolean
}

export const StyledButton = styled.button<IStyledButtonProps>`
	${flex('row', 'center', 'center', '6px')}
	// cor de fundo padrão ou a que informar na prop $background color
	background-color: ${(props) => props.$backgroundColor || vars.colors.blue};

	// altera a cor da fonte para primária caso o button seja transparente
	color: ${(props) => props.$backgroundColor === 'transparent' ? props.theme.colors.primaryFontColor : vars.colors.white};

	// caso seja um iconButton, define a cor da fonte como a primária
	color: ${(props) => props.$iconButton && props.theme.colors.primaryFontColor};

	// border radius padrão das vars
	border-radius: ${vars.border.radius};
	padding: 8px 12px;
	border: none;

	&:hover {
		// caso haja um hover, altera um pouco a trasnparência da cor de fundo
		background-color: ${(props) => props.$backgroundColor || vars.colors.blue}66;
		cursor: pointer;
	}

	&:active {
		transform: translate(.5px, .5px);
	}

	// caso seja um iconButton, adiciona alguns estilos a mais
	${({ $iconButton = false }) => $iconButton && `
		background-color: transparent;
		border-radius: 50%;
		padding: 6px;

		&:hover {
			background-color: ${vars.colors.gray}3;
		}
	`}
`
