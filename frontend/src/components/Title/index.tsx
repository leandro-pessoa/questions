import { vars } from '@/styles/vars'
import styled from 'styled-components'

export const Title = styled.h1`
	font-size: x-large;

	@media screen and (min-width: ${vars.breakpoints.notebook}) {
		font-size: xx-large;
	}
`
