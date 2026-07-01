import { vars } from '@/styles/vars'
import styled from 'styled-components'

interface IStyledDivProps {
	readonly $positionFixed: boolean
}

export const StyledDiv = styled.div<IStyledDivProps>`
	// troca para position fixed, de acordo com a prop $positionFixed
	${({ $positionFixed = false }) =>
		$positionFixed &&
		`
		position: fixed;
		top: 16px;
		left: 16px;
	`}

	.link {
		.link__title {
			border-bottom: 3px solid ${vars.colors.blue};
		}
	}
`
