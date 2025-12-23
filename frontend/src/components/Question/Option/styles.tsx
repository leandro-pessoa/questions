import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

interface IStyledButtonProps {
	readonly $cutted: boolean
	readonly $selected: boolean
}

export const StyledButton = styled.button<IStyledButtonProps>`
	${flex('row', 'flex-start', 'center', '16px')}
	background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
	color: ${(props) => props.theme.colors.primaryFontColor};
	border: none;
	border-radius: ${vars.border.radius};
	padding: 6px 12px;
	transition: ease 0.2s;
	text-decoration: ${(props) => (props.$cutted ? 'line-through' : 'none')};

	&:hover {
		cursor: pointer;
		background-color: ${(props) =>
			props.theme.colors.primaryBackgroundColor};
		transform: translate(5px);

		.option__cut {
			display: flex;
		}
	}

	&:active {
		transform: translate(3px);
	}

	.option__cut {
		display: none;
		padding: 0;
	}

	.option__letter {
		border-radius: 50%;
		border: 2px solid ${vars.colors.blue};
		padding: 3px 7.5px;
		background-color: ${(props) =>
			props.$selected ? vars.colors.blue : 'transparent'};
		color: ${(props) =>
			props.$selected
				? vars.colors.white
				: props.theme.colors.primaryFontColor};
	}
`
