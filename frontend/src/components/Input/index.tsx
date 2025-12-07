import { vars } from '@/styles/vars'
import styled from 'styled-components'

const Input = styled.input`
	background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
	border: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
	color: ${(props) => props.theme.colors.primaryFontColor};
	border-radius: 6px;
	font-size: 1rem;
	padding: 6px 14px;
	transition: ease .1s;

	&:focus {
		outline: 3px solid ${vars.colors.blue}aa;
	}
`

export default Input
