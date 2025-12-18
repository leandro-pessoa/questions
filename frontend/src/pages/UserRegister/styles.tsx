import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const RegisterContainer = styled.div`
	${flex('row', 'center', 'center')}
	height: 100vh;

	.empty-container {
		display: none;
	}

	.content-container {
		${flex('column', 'center', 'auto', '6px')}
		width: 100%;
	}

	@media screen and (min-width: ${vars.breakpoints.smallSmartphone}) {
		.content-container {
			${flex('column', 'center', 'auto', '6px')}
			width: 80%;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.smartphone}) {
		.empty-container {
			display: block;
			width: 30%;
			height: 100%;
			background-color: ${(props) => props.theme.colors.tertiaryBackgroundColor};
		}

		.content-container {
			width: 70%;
		}
	}

`
