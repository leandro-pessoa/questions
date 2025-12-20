import { StyledLink as Link } from '@/components/Link'
import { Title } from '..'
import { vars } from '@/styles/vars'

interface ITitleLink {
	children: React.ReactNode | string | [React.ReactNode | string][]
	positionFixed?: boolean
}

export const TitleLink = ({ children, positionFixed = false }: ITitleLink) => {
	return (
		<div style={ positionFixed ? {
			position: 'fixed',
			top: '16px',
			left: '16px'
		} : {}}>
			<Link to='/'>
				<Title style={{ borderBottom: `3px solid ${vars.colors.blue}` }}>{children}</Title>
			</Link>
		</div>
	)
}
