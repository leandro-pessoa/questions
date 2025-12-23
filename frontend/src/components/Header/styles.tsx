import { flex } from '@/utils/flex'
import styled from 'styled-components'
import { vars } from '@/styles/vars'

export const StyledHeader = styled.header`
	${flex('row', 'space-around', 'center')}
	height: calc(${vars.sizes.headerHeight} - 1px);
	background-color: transparent;
	backdrop-filter: blur(10px);
	border-bottom: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
`
