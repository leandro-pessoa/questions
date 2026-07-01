import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

import { NavLink } from 'react-router-dom'

interface StyledNavLinkProps {
	readonly $activeColor?: string
}

export const StyledNavLink = styled(NavLink)<StyledNavLinkProps>`
	${flex('row', 'center', 'center')}
	color: ${(props) => props.theme.colors.primaryFontColor};
	text-decoration: none;

	&.active {
		// altera a cor da border bottom, de acordo com a prop $activeColor
		border-bottom: 3px solid ${(props) =>
			props.$activeColor ? props.$activeColor : props.theme.colors.primaryFontColor
		};
		border-radius: 3px;
	}

	span {
		display: none;
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		span {
			display: block;
		}
	}
`
