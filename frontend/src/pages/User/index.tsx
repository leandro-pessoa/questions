import { CenterContainer } from '@/components/CenterContainer'
import { Container } from '@/components/Container'
import Header from '@/components/Header'
import { Title } from '@/components/Title'
import UpdateUser from './UpdateUserData'
import UpdateUserPassword from './UpdateUserPassword'


const User = () => {
	return (
		<>
			<Header />
			<CenterContainer style={{ gap: '32px', padding: '48px 0' }}>
				<Container>
					<Title>Estatísticas</Title>
				</Container>
				<Container>
					<Title>Alterar dados</Title>
					<UpdateUser />
				</Container>
				<Container>
					<Title>Alterar senha</Title>
					<UpdateUserPassword />
				</Container>
			</CenterContainer>
		</>
	)
}

export default User
