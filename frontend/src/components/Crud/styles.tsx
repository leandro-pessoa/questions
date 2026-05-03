import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const StyledDiv = styled.div`
	${flex('column', 'auto', 'auto', '16px')}
	width: 95%;
	margin: 32px 0;

	.filters_wrapper {
		${flex('row', 'space-between', 'center', '8px')}
		.filters_wrapper__select {
			width: 50%;
		}

		.filters_wrapper__search_input {
			width: 100px;
		}
	}

	.responsive_table {
		max-height: 70vh;
		width: 100%;
		overflow: auto;

		table {
			width: 100%;
			border-radius: 10px;

			th {
				border-bottom: 2px solid ${vars.colors.blue};
			}

			th, td {
				padding: 12px;
				text-align: center;
			}

			td {
				border-bottom: 2px solid ${(props) => props.theme.colors.primaryBorderColor};
				max-width: 100px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}

	@media screen and (min-width: ${vars.breakpoints.smallSmartphone}) {
		.filters_wrapper {
			.filters_wrapper__search_input {
				width: max-content;
			}
		}
	}

	@media screen and (min-width: ${vars.breakpoints.smartphone}) {
		width: 80%;
		margin: 0;

		.responsive_table {
			max-height: 65vh;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		.filters_wrapper {
			.filters_wrapper__select {
				width: 30%;
			}
		}
	}
`


