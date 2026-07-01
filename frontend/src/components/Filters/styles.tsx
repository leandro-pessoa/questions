import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
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

	.filters__toggle-button {
		width: 100%;
		${flex('row', 'space-between')}

		.toggle-button__wrapper {
			${flex('row', 'auto', 'center', '4px')}
		}
	}

	.filters__content {
		padding: ${(props) => props.$display ? '16px' : '0'} 0;
		height: ${(props) => props.$display ? 'auto' : '0'};
		overflow: ${(props) => props.$display ? 'visible' : 'hidden'};

		.content__selects {
			display: grid;
			grid-template-columns: 100%;
			gap: 8px;
		}

		.content__bottom {
			${flex('row', 'space-between', 'center', '12px')}
			margin-top: 12px;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.smallSmartphone}) {
		.filters__content {
			.content__selects {
				grid-template-columns: 50% auto;
			}
		}
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		padding: 0 10%;

		.filters__content {
			.content__selects {
				grid-template-columns: 33% 33% auto;
			}
		}
	}

	@media screen and (min-width: ${vars.breakpoints.desktop}) {
		padding: 0 20%;
	}
`
