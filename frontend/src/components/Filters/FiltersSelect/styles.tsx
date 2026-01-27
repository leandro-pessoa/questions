import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

interface IStyledDivProps {
	readonly $expandBoxDisplay: boolean
}

const borderRadius = vars.border.radius

export const StyledDiv = styled.div<IStyledDivProps>`
	position: relative;

	.select__button {
		${flex('row', 'space-between', 'center', '8px')}
		background-color: ${(props) => props.theme.colors.tertiaryBackgroundColor};
		color: ${(props) => props.theme.colors.primaryFontColor};
		padding: 8px 16px;
		border-radius: ${
			(props) =>
				props.$expandBoxDisplay ? `${borderRadius} ${borderRadius} 0 0` : borderRadius
		};
		border: none;
		width: 100%;

		&:hover {
			cursor: pointer;
		}
	}

	.select__expand-box {
		position: absolute;
		display: ${(props) => props.$expandBoxDisplay ? 'flex' : 'none'};
		flex-direction: column;
		gap: 6px;
		background-color: ${(props) => props.theme.colors.primaryBackgroundColor};
		padding: 8px;
		border: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
		border-radius: 0 0 ${borderRadius} ${borderRadius};
		border-top: none;
		z-index: 10;
		max-height: 200px;
		left: 0;
		right: 0;

		.expand-box__topics-list {
			padding: 6px;
			padding-bottom: 0;
			overflow-y: auto;

			li {
				${flex('row', 'flex-start', 'center')}
				border-bottom: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
				width: calc(100% - 16px);
				padding-left: 12px;

				&:hover {
					cursor: pointer;
					background-color: ${(props) => props.theme.colors.tertiaryBackgroundColor};
				}

				&:last-child {
					border-bottom: none;
				}

				button {
					background-color: transparent;
					border: none;
					width: 100%;
					text-align: start;
					padding: 8px;
					color: ${(props) => props.theme.colors.primaryFontColor};
					cursor: pointer;
				}
			}
		}
	}
`
