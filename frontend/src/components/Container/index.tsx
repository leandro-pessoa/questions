import styled from 'styled-components'
import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'

interface IContainerProps {
	readonly $fixedWidth?: boolean
}

const xPadding = 16

export const Container = styled.main<IContainerProps>`
	${flex('column', '', '', '32px')}
	background-color: transparent;
	backdrop-filter: blur(10px);
	padding: 16px;
	border: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
	border-radius: ${vars.border.radius};
	width: calc(80% - ${xPadding * 2}px);

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
