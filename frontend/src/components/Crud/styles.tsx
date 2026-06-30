import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const StyledDiv = styled.div`
	${flex('column', 'auto', 'auto', '16px')}
	width: 95%;
	margin: 32px 0;

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

	.crud_footer {
		${flex('column', 'auto', 'auto', '8px')}

		ul {
			align-self: center;
			padding: 0;
		}

		.wide_refresh {
			display: none;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.smartphone}) {
		width: 80%;
		margin: 0;

		.responsive_table {
			max-height: 65vh;
		}

		.crud_footer {
			${flex('row', 'space-between', 'center')}

			ul {
				width: 50%;
			}

			.wide_refresh {
				display: flex;
			}
		}
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		.footer__container {
			${flex('row')}
			width: 25%;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.notebook}) {
		.crud_footer__blank-div {
			display: block;
			width: 25%;
		}
	}
`


