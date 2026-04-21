import { StyledNavLink } from './styles'

// tipagem dos props
interface NavLinkProps {
	children:
		| React.ReactElement
		| React.ReactElement[]
		| string
		| (string | React.ReactElement)[]
	to: string
	activeColor?: string
}

const NavLink = ({ children, to, activeColor }: NavLinkProps) => {
	return (
		<StyledNavLink
			to={to}
			className={({ isActive }) =>
				`${isActive ? 'active' : ''}`
			}
			$activeColor={activeColor}
		>
			{children}
		</StyledNavLink>
	)
}

export default NavLink
