import Form from '@/components/Form'
import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const StyledForm = styled(Form)`
	${flex('column', 'space-between', 'flex-start', '8px')}
	width: 100%;

	.filters-header {
		${flex('row', 'space-between')}
		width: 100%;

		.filters-header__select-quantity {
			width: 100%;
		}

		.filters-header__cancel-search {
			display: flex;
		}
	}


	.search {
		${flex('row', 'auto', 'center', '4px')}
		width: 100%;

		.search__select-column {
			width: 40%;
		}

		.search__search-input {
			width: calc(60% - 32px); // - total input x padding
			height: calc(100% - 16px); // - total input y padding
		}
	}


	@media screen and (min-width: ${vars.breakpoints.smallSmartphone}) {
		.search_input {
			width: max-content;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.smartphone}) {
		${flex('row', 'space-between', 'center', '8px')}

		.filters-header {
			width: auto;

			.select-quantity {
				width: 30%;
			}

			.filters-header__cancel-search {
				display: none;
			}
		}

		.search {
			width: 60%;
		}

		.select-column {
			width: auto;
		}


	}

`
