import styled from 'styled-components'
import { flex } from '@/utils/flex'

export const CenterContainer = styled.div`
	${flex('row', 'center', 'center')}
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`
