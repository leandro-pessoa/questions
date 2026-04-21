import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import styled from 'styled-components'

import NavLink from '@/components/Nav/NavLink'
import { Users, MessageCircleQuestionMark, ArrowLeft } from 'lucide-react'
import Button from "@/components/Button"

export const StyledNav = styled.nav`
	${flex('row', 'space-around', 'center')}
	background-color: ${vars.colors.blue};
	padding: 8px 0;

	@media screen and (min-width: ${vars.breakpoints.smartphone}) {
		flex-direction: column;
		height: 100vh;
		width: max-content;
		padding: 0 16px;
	}
`

const AdminNav = () => {
	return (
		<StyledNav>
			<NavLink to='/' activeColor={vars.colors.white}>
				<Button backgroundColor='transparent' iconButton title='Página inicial'>
					<ArrowLeft color={vars.colors.white} />
				</Button>
			</NavLink>
			<NavLink to='/admin/questoes' activeColor={vars.colors.white}>
				<Button backgroundColor='transparent' iconButton title='Questões'>
					<MessageCircleQuestionMark color={vars.colors.white} />
				</Button>
			</NavLink>
			<NavLink to='/admin/usuarios' activeColor={vars.colors.white}>
				<Button backgroundColor='transparent' iconButton title='Usuários'>
					<Users color={vars.colors.white} />
				</Button>
			</NavLink>
		</StyledNav>
	)
}

export default AdminNav
