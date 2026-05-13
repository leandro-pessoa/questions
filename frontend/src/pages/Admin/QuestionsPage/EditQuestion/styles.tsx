import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const StyledUl = styled.ul`
	width: 100%;

	li {
		${flex('row', 'auto', 'flex-start', '8px')}
		padding: 8px 16px;

		.alternative__letter-container {
			width: 20%;
		}

		.alternative__text-container {
			width: 80%;
		}
	}
`
