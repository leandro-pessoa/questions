import styled from 'styled-components'
import { flex } from '@/utils/flex'
import { vars } from '@/styles/vars'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/Button'

const StyledDiv = styled.div`
	${flex('column', 'auto', 'center', '32px')}
	width: 100%;
	margin: 32px 0;

	button {
		width: 80%;
		padding: 64px 0;
		font-size: 1.3rem;
		border: 2px solid ${vars.colors.mediumGray};
		margin: 0 3%;

		&:hover {
			border-color: ${vars.colors.blue}
		}
	}

	@media screen and (min-width: ${vars.breakpoints.smartphone}) {
		flex-direction: row;
		gap: 0;

		button {
			padding: 12% 0;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.notebook}) {
		button {
			font-size: 2rem;
		}
	}
`

const Menu = () => {
	const navigate = useNavigate()

	return (
		<StyledDiv>
			<Button
				backgroundColor='transparent'
				onClick={() => navigate('/admin/questoes')}
			>
				Questões
			</Button>
			<Button
				backgroundColor='transparent'
				onClick={() => navigate('/admin/usuarios')}
			>
				Usuários
			</Button>
		</StyledDiv>
	)
}

export default Menu
