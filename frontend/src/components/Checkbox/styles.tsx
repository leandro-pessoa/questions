import { vars } from '@/styles/vars'
import styled from 'styled-components'

export const StyledLabel = styled.label`
	/* customiza o label (container) */
	display: block;
	position: relative;
	padding: 8px 0;
	padding-left: 35px;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	width: 100%;

	/* esconde o checkbox padrão do navegador */
	.checkbox__input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	/* cria a checkbox customizada e insere no lugar da antiga */
	.checkbox__checkmark {
		position: absolute;
		top: 5px;
		left: 0;
		height: 20px;
		width: 20px;
		background-color: ${(props) => props.theme.colors.tertiaryBackgroundColor};
	}

	/* altera o background color no hover da checkbox */
	&:hover .checkbox__input ~ .checkbox__checkmark {
		background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
	}

	/* quando a checkbox estiver marcada, altera a cor de fundo */
	.checkbox__input:checked ~ .checkbox__checkmark {
		background-color: ${vars.colors.blue};
	}

	/* cria o checkmark (invisível quando desmarcada) */
	.checkbox__checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	/* mostra o checkmark ao marcar a checkbox */
	.checkbox__input:checked ~ .checkbox__checkmark:after {
		display: block;
	}

	/* estilização do checkmark */
	.checkbox__checkmark:after {
		left: 6px;
		top: 2px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		.checkbox__checkmark {
			top: 8px;
		}
	}
`
