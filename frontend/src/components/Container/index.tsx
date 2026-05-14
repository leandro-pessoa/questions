import styled from 'styled-components'
import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'

interface IContainerProps {
	readonly $fixedWidth?: boolean
	readonly $relativeWidth?: string
	readonly $backgroundColor?: 'transparent' | 'colorful'
	readonly $shadow?: boolean
}

const xPadding = 16

export const Container = styled.main<IContainerProps>`
	${flex('column', '', '', '32px')}
	background-color: ${({ $backgroundColor = 'transparent', theme }) =>
		$backgroundColor === 'transparent'
			? 'transparent'
			: theme.colors.primaryBackgroundColor};
	backdrop-filter: blur(10px);
	padding: 16px;
	border: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
	border-radius: ${vars.border.radius};
	width: calc(80% - ${xPadding * 2}px);

	${({ $relativeWidth = '80%' }) =>
		$relativeWidth !== '80%' &&
		`
		@media screen and (min-width: ${vars.breakpoints.tablet}) {
			width: ${$relativeWidth};
		}
	`}

	${({ $shadow = false }) =>
		$shadow &&
		`
		box-shadow: 0px 0px 10px ${vars.colors.shadow};
	`}

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
