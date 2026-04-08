import styled from 'styled-components'
import { flex } from '@/utils/flex'
import { vars } from '@/styles/vars'

export const StyledDiv = styled.div`
	${flex('column', 'auto', 'center', '32px')}
	height: 50%;

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		${flex('row', 'auto', 'center', '0px')}
		width: 50%;
	}
`
