import { useNavigate } from 'react-router-dom'

import { CenterContainer } from '@/components/CenterContainer'
import { Container } from '@/components/Container'
import Header from '@/components/Header'
import { Title } from '@/components/Title'
import UpdateUser from './UpdateUserData'
import UpdateUserPassword from './UpdateUserPassword'
import UserStatistics from './UserStatistics'
import Button from '@/components/Button'
import { ArrowLeft } from 'lucide-react'

const User = () => {
	const navigate = useNavigate()

	return (
		<>
			<Header />
			<CenterContainer style={{ gap: '32px', padding: '48px 0' }}>
				<Button onClick={() => navigate(-1)}>
					<ArrowLeft />
					Voltar
				</Button>
				<Container>
					<Title>Estatísticas</Title>
					<UserStatistics />
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
