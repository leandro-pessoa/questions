import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

const xPadding = 32

export const StyledLi = styled.li`
	width: calc(80% - ${xPadding * 2}px);
	background-color: ${(props) => props.theme.colors.tertiaryBackgroundColor};
	border: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
	border-radius: ${vars.border.radius};
	padding: 16px ${xPadding}px;
	box-shadow: 0 0 10px #0000001f;

	.alternatives {
		${flex('column', 'auto', 'auto', '12px')}

		.alternatives__option {
			${flex('row', 'flex-start', 'center', '16px')}
			background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
			color: ${(props) => props.theme.colors.primaryFontColor};
			border: none;
			border-radius: ${vars.border.radius};
			padding: 6px 12px;
			transition: ease .2s;

			&:hover {
				cursor: pointer;
				background-color: ${(props) => props.theme.colors.tertiaryBackgroundColor};
				transform: translate(5px);

				.option__cut {
					display: flex;
				}
			}

			&:active {
				transform: translate(3px);
			}

			.option__cut {
				display: none;
				padding: 0;
			}

			.option__letter {
				border-radius: 50%;
				border: 2px solid ${vars.colors.blue};
				padding: 3px 7px;
			}
		}
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		width: 70%;
	}
	@media screen and (min-width: ${vars.breakpoints.notebook}) {
		width: 60%;
	}
	@media screen and (min-width: ${vars.breakpoints.desktop}) {
		width: 50%;
	}
`
