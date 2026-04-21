import { flex } from '@/utils/flex'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { selectUser, logout, selectAdmin } from '@/app/reducers/user'
import { useNavigate } from 'react-router-dom'

import NavLink from './NavLink'
import Button from '../Button'
import { CircleUser, LogIn, UserPlus, LogOut, Settings } from 'lucide-react'

const StyledNav = styled.nav`
	${flex('row', 'center', 'center', '16px')}
`

const Nav = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const user = useAppSelector(selectUser)
	const admin = useAppSelector(selectAdmin)

	const logoutHandle = () => {
		navigate('/login')
		dispatch(logout())
	}

	return (
		<StyledNav>
			{
				user ?
					<>
						{
							admin &&
								<NavLink to='/admin'>
									<Button backgroundColor='transparent' iconButton title='Administrador'>
										<Settings />
									</Button>
								</NavLink>
						}
						<NavLink to='/usuario'>
							<Button backgroundColor='transparent' iconButton title='Usuário'>
								<CircleUser />
							</Button>
						</NavLink>
						<Button backgroundColor='transparent' onClick={logoutHandle} iconButton title='Sair'>
							<LogOut />
						</Button>
					</>
				:
					<>
						<NavLink to='/login'>
							<Button iconButton title='Entrar'>
								<LogIn />
							</Button>
						</NavLink>
						<NavLink to='/usuario/cadastro'>
							<Button iconButton title='Cadastrar-se'>
								<UserPlus />
							</Button>
						</NavLink>
					</>
			}
		</StyledNav>
	)
}

export default Nav
