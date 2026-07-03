import { useNavigate } from 'react-router-dom'

import Button from '@/components/Button'
import { CenterContainer } from '@/components/CenterContainer'
import { Title } from '@/components/Title'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<CenterContainer $height='center-fixed'>
			<Button icon={<ArrowLeft />} onClick={() => navigate(-1)}>
				Voltar
			</Button>
			<Title style={{ marginTop: '16px' }}>
				404 - Página não encontrada
			</Title>
		</CenterContainer>
	)
}

export default NotFound
