import { StyledLink as Link } from '@/components/Link'
import { Title } from '..'
import { StyledDiv } from './styles'

import type { ReactChildren } from '@/types/ReactChildren'

interface ITitleLink {
	children: ReactChildren
	positionFixed?: boolean
}

export const TitleLink = ({ children, positionFixed = false }: ITitleLink) => {
	return (
		<StyledDiv $positionFixed={positionFixed}>
			<Link to='/' className='link'>
				<Title className='link__title'>{children}</Title>
			</Link>
		</StyledDiv>
	)
}
