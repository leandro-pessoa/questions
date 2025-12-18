import styled from 'styled-components'
import { flex } from '@/utils/flex'
import { vars } from '@/styles/vars'

interface ICenterContainerProps {
	absolutePosition?: boolean
}

const absolute = `
	padding: 0;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`

export const CenterContainer = styled.div<ICenterContainerProps>`
	${flex('row', 'center', 'center')}
	padding: 0 0;

	${({ absolutePosition = false }) =>
		absolutePosition && absolute}

	@media screen and (min-width: ${vars.breakpoints.tablet}){
		/* ${absolute} */
	}
`
