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
		display: grid;
		grid-template-columns: 32% 32% 32%;
		gap: 8px;
		padding: ${(props) => props.$display ? '16px' : '0'} 0;
		height: ${(props) => props.$display ? 'auto' : '0'};
		overflow: ${(props) => props.$display ? 'visible' : 'hidden'};

		.content__filter-button {
			grid-column: 1;
			grid-row: revert;
			margin-top: 6px;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		padding: 0 10%;
	}

	@media screen and (min-width: ${vars.breakpoints.desktop}) {
		padding: 0 20%;
	}
`
