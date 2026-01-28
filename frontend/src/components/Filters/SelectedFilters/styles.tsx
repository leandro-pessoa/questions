import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

export const StyledDiv = styled.div`
	ul {
		${flex('column', 'center', 'flex-start', '12px')}
		margin: 32px 0;

		li {
			${flex('row', 'flex-start', 'center', '6px')}
			flex-wrap: wrap;

			.filters__topic {
				border-bottom: 2px solid ${vars.colors.blue};
			}

			.filters__value {
				${flex('row', 'space-between', 'center', '4px')}
				padding: 0 8px;
				width: max-content;
				background-color: ${(props) => props.theme.colors.tertiaryBackgroundColor};
				border-radius: ${vars.border.radius};
			}
		}
	}
`
