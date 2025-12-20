import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledNavLink = styled(NavLink)`
	${flex('row', 'center', 'center')}
	color: ${(props) => props.theme.colors.primaryFontColor};
	text-decoration: none;

	span {
		display: none;
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		span {
			display: block;
		}
	}
`
