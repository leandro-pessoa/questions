import styled from 'styled-components'
import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'

interface IContainerProps {
	readonly $fixedWidth?: boolean
	readonly $relativeWidth?: string
	readonly $backgroundColor?: 'transparent' | 'colorful'
	readonly $shadow?: boolean
}

// padding horizontal padrão do Container
const xPadding = 16

export const Container = styled.main<IContainerProps>`
	${flex('column', '', '', '32px')}

	// muda a cor de fundo para transparente ou colorida, de acordo com a prop $backgroundColor
	background-color: ${({ $backgroundColor = 'transparent', theme }) =>
		$backgroundColor === 'transparent'
			? 'transparent'
			: theme.colors.primaryBackgroundColor};

	backdrop-filter: blur(10px);
	padding: 16px;
	border: 1px solid ${(props) => props.theme.colors.primaryBorderColor};

	// border radius global
	border-radius: ${vars.border.radius};

	// width de 80% menos o padding horizontal
	width: calc(80% - ${xPadding * 2}px);

	// caso a width relativa seja diferente a 80%, adiciona a alteração para dispositivos maiores também
	${({ $relativeWidth = '80%' }) =>
		$relativeWidth !== '80%' &&
		`
		@media screen and (min-width: ${vars.breakpoints.tablet}) {
			width: ${$relativeWidth};
		}
	`}

	// adiciona uma sombra ao container, de acordo com a prop $shadow
	${({ $shadow = false }) =>
		$shadow &&
		`
		box-shadow: 0px 0px 10px ${vars.colors.shadow};
	`}

	// adiciona uma width fixa, de acordo com a prop $fixedWidth
	// altera a width para os demais tamanhos de tela
	${({ $fixedWidth = false }) =>
		$fixedWidth &&
		`
		@media screen and (min-width: ${vars.breakpoints.smallSmartphone}) {
			width: 250px;
		}
		@media screen and (min-width: ${vars.breakpoints.tablet}) {
			width: 300px;
			padding: 32px;
		}
	`}
`
