import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const StyledDiv = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	backdrop-filter: blur(4px);
	z-index: 13;
	overflow-y: auto;

	.buttons_wrapper {
		${flex('row', 'auto', 'center', '16px')}
		margin-top: 16px;
	}
`


