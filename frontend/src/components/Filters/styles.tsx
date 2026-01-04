import { vars } from '@/styles/vars'
import styled from 'styled-components'

interface IStyledSectionProps {
	readonly $display: boolean
}

export const StyledSection = styled.section<IStyledSectionProps>`
	background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
	margin-top: 32px;
	border: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
	border-right: none;
	border-left: none;
	padding: 0 5%;

	.filters__content {
		height: ${(props) => props.$display ? '100px' : '0'};
		transition: height .3s;
		overflow: hidden;

		div {
			padding: 24px 0;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		padding: 0 10%;
	}

	@media screen and (min-width: ${vars.breakpoints.desktop}) {
		padding: 0 20%;
	}
`
