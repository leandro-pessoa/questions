import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const StyledHeader = styled.header`
	${flex('row', 'space-around', 'center')}
	height: 60px;
	background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
	border-bottom: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
`
