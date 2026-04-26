import { vars } from '@/styles/vars'
import styled from 'styled-components'

export const StyledDiv = styled.div`
	max-height: 70vh;
	max-width: 80%;
	overflow: auto;
	margin: 32px 0;

	table {
		border-radius: 10px;

		th {
			border-bottom: 2px solid ${vars.colors.blue};
		}

		th, td {
			padding: 12px;
			text-align: center;
		}

		td {
			border-bottom: 2px solid ${(props) => props.theme.colors.primaryBorderColor};
			max-width: 100px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.smartphone}) {
		margin: 0;
		max-height: 80vh;
	}
`


