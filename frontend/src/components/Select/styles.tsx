import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

interface IStyledDivProps {
	readonly $expandBoxDisplay: boolean
}

const borderRadius = vars.border.radius

export const StyledDiv = styled.div<IStyledDivProps>`
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
		position: relative;
		display: ${(props) => props.$expandBoxDisplay ? 'flex' : 'none'};
		flex-direction: column;
		gap: 6px;
		background-color: ${(props) => props.theme.colors.primaryBackgroundColor};
		padding: 8px;
		border-radius: 0 0 ${borderRadius} ${borderRadius};
		z-index: 10;
		max-height: 200px;

		.expand-box__topics-list {
			${flex('column', 'center', 'flex-start', '12px')}
			padding: 6px;
			padding-bottom: 0;
			overflow-y: auto;

			li {
				width: calc(100% - 16px);
				padding: 6px 8px;
				border-bottom: 1px solid ${vars.colors.blue};

				&:last-child {
					border-bottom: none;
				}

				&:hover {
					cursor: pointer;
					background-color: ${(props) => props.theme.colors.tertiaryBackgroundColor};
				}
			}
		}
	}
`
