import Form from '@/components/Form'
import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const StyledForm = styled(Form)`
	${flex('column', 'space-between', 'flex-start', '8px')}
	width: 100%;

	.select-quantity {
		width: 100%;
	}

	.search {
		${flex('row', 'auto', 'center', '4px')}
		width: 100%;

		.select-column {
			width: 40%;
		}

		.search-input {
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

		.search {
			width: 60%;
		}

		.select-column {
			width: auto;
		}

		.select-quantity {
			width: 30%;
		}

	}

`
