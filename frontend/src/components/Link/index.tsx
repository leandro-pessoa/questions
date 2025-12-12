import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface IStyledLinkProps {
	readonly decoration?: boolean
}

export const StyledLink = styled(Link)<IStyledLinkProps>`
	color: ${(props) => props.theme.colors.primaryFontColor};
	text-decoration: ${({ decoration = false }) => decoration ? 'baseline' : 'none'};

	&:hover {
		color: ${(props) => props.theme.colors.secondaryFontColor};
	}
`
