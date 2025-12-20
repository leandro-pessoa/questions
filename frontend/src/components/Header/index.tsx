import Nav from '../Nav'
import { StyledHeader } from './styles'
import ThemeButton from '../Button/ThemeButton'
import { TitleLink } from '../Title/TitleLink'

const Header = () => {
	return (
		<StyledHeader>
			<TitleLink>
				Questions?
			</TitleLink>
			<div style={{ display: 'flex', gap: '12px' }}>
				<Nav />
				<ThemeButton />
			</div>
		</StyledHeader>
	)
}

export default Header
