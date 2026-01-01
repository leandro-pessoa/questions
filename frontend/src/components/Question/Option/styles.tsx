import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

interface IStyledLiProps {
	readonly $cutted: boolean
	readonly $selected: boolean
	readonly $isAnswered: boolean
}

export const StyledLi = styled.li<IStyledLiProps>`
	${flex('row', 'center', 'center', '6px')}
	background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
	border: none;
	border-radius: ${vars.border.radius};
	transition: ease 0.2s;
	text-decoration: ${(props) => (props.$cutted ? 'line-through' : 'none')};

	${(props) => !props.$isAnswered && `
			&:hover {
				background-color: ${props.theme.colors.primaryBackgroundColor};
				transform: translate(5px);

				.option__cut {
					display: flex;
				}
			}

			&:active {
				transform: translate(3px);
			}
		`}

	&:last-child {
		margin-bottom: 20px;
	}

	.option__cut {
		display: none;
		padding: 0;
		margin-left: 12px;
	}

	.option__select {
		${flex('row', 'flex-start', 'center', '16px')}
		background-color: transparent;
		color: ${(props) => props.$cutted ? props.theme.colors.primaryBorderColor : props.theme.colors.primaryFontColor};
		border: none;
		width: 90%;
		padding: 8px 12px;

		&:hover {
			cursor: pointer;
		}

		.select__letter {
			${flex('row', 'center', 'center')}
			border-radius: 50%;
			border: 2px solid ${vars.colors.blue};
			width: 25px;
			height: 25px;
			background-color: ${(props) =>
				props.$selected ? vars.colors.blue : 'transparent'};
			color: ${(props) =>
				props.$selected
					? vars.colors.white
					: props.theme.colors.primaryFontColor};
		}

		.select__text {
			${flex('row', 'flex-start')}
			width: 80%;
			overflow-wrap: break-word;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.smartphone}){
		.option__select {
			.select__text {
				width: 90%;
			}
		}
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		.option__select {
			width: 95%;

			.select__letter {
				width: 30px;
				height: 30px
			}
		}
	}
`
