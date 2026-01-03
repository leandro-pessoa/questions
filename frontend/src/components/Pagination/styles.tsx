import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const StyledUl = styled.ul`
	${flex('row', 'center', 'center', '12px')}
	padding: 32px 0;

	li {
		button {
			width: 30px;
			height: 30px;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		li {
			button {
				width: 40px;
				height: 40px;
			}
		}
	}
`
