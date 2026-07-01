import styled from 'styled-components'

import { Link } from 'react-router-dom'

interface IStyledLinkProps {
	readonly $decoration?: boolean
}

export const StyledLink = styled(Link)<IStyledLinkProps>`
	color: ${(props) => props.theme.colors.primaryFontColor};

	// acrescenta uma baseline caso a prop $decoration seja true
	text-decoration: ${({ $decoration = false }) => $decoration ? 'baseline' : 'none'};

	&:hover {
		color: ${(props) => props.theme.colors.secondaryFontColor};
	}
`
