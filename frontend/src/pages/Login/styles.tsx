import styled from 'styled-components'
import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'

const xPadding = 16

export const LoginContainer = styled.main`
	${flex('column', '', '', '32px')}
	background-color: transparent;
	backdrop-filter: blur(10px);
	padding: 16px;
	border: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
	border-radius: ${vars.border.radius};
	width: calc(80% - ${xPadding * 2}px);

	@media screen and (min-width: ${vars.breakpoints.smallSmartphone}) {
		width: 250px;
	}
	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		width: 300px;
		padding: 32px;
	}
`
