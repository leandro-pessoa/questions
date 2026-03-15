import { useNavigate } from 'react-router-dom'

import { ArrowLeft } from 'lucide-react'
import Button from '../Button'
import { CenterContainer } from '../CenterContainer'
import { StyledDiv } from './styles'
import ThemeButton from '../Button/ThemeButton'

interface ISideScreenProps {
	children: React.ReactNode | string | [string | React.ReactNode][]
	side?: 'right' | 'left'
}

const SideScreen = ({ children, side = 'left' }: ISideScreenProps) => {
	// navegação do react router dom
	const navigate = useNavigate()

	return (
		<StyledDiv>
			{	// caixa do lado esquerdo
				side === 'left' &&
				<div className='empty-container'></div>
			}
			<CenterContainer className='content-container'>
				<Button
					onClick={() => navigate(-1)}
					iconButton
					style={{ alignSelf: 'flex-start', marginLeft: '16px'  }}
					title='Voltar'
				>
					<ArrowLeft />
				</Button>
				<ThemeButton fixed={true} />
				{/* conteúdo que ficará no lado oposto da caixa */}
				{children}
			</CenterContainer>
			{	// caixa do lado direito
				side === 'right' &&
				<div className='empty-container'></div>
			}
		</StyledDiv>
	)
}

export default SideScreen
