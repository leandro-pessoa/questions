import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const AlternativesDiv = styled.div`
	grid-column: 1 / 3;

	ul {
		width: 100%;

		li {
			${flex('row', 'auto', 'flex-start', '8px')}
			padding: 8px 0;

			.alternative__letter-container {
				width: 20%;

				input {
					width: calc(100% - 12px);
				}
			}

			.alternative__text-container {
				width: 80%;
			}

			.alternavite__options {
				${flex('row', 'auto', 'center', '6px')}
			}
		}

		@media screen and (min-width: ${vars.breakpoints.smartphone}) {
			li {
				padding: 8px 16px;

				.alternative__letter-container {
					width: 20%;
				}

				.alternative__text-container {
					width: 90%;
				}
			}
		}
	}

	.empty-alternatives {
		text-align: center;
		margin: 16px 0;
	}

	.add-alternative {
		margin-top: 16px;

		svg {
			height: 15px;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		.add-alternative {
			svg {
				height: 20px;
			}
		}
	}
`

export const ButtonsDiv = styled.div`
	${flex('row', 'auto', 'center', '16px')}
	grid-column: 1 / 3;
	margin-top: 12px;
`
