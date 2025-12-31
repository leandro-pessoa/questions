import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

const xPadding = 12

export const StyledLi = styled.li`
	position: relative;
	width: calc(90% - ${xPadding * 2}px);
	background-color: ${(props) => props.theme.colors.tertiaryBackgroundColor};
	border: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
	border-radius: ${vars.border.radius};
	padding: 16px ${xPadding}px;
	box-shadow: 0 0 10px #0000001f;

	.question__header {
		${flex('row', 'flex-start', 'center')}
		position: relative;
		flex-wrap: wrap;
		background-color: ${vars.colors.blue};
		color: ${vars.colors.white};
		margin: 0 -12px;
		margin-top: -16px;
		border-top-right-radius: ${vars.border.radius};
		border-top-left-radius: ${vars.border.radius};
		padding: 4px 12px 4px 60px;

		.header__element {
			&::after {
				content: ' -';
			}

			&:last-child {
				&::after {
					content: '';
				}
			}
			padding: 2px;
		}

		.header__number {
			${flex('row', 'center', 'center')}
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			background-color: ${(props) => props.theme.colors.primaryBackgroundColor};
			color: ${(props) => props.theme.colors.primaryFontColor};
			border-top-left-radius: 7px;
			padding: 0 12px;
		}
	}

	.question__statement {
		margin: 24px 0;
		overflow-wrap: break-word;
	}

	.question__alternatives {
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
		padding: 16px 32px;

		.question__header {
			margin: 0 -32px;
			margin-top: -16px;
		}
	}
	@media screen and (min-width: ${vars.breakpoints.notebook}) {
		width: 60%;
	}
	@media screen and (min-width: ${vars.breakpoints.desktop}) {
		width: 50%;
	}
`
