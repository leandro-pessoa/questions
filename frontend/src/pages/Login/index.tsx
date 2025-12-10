import Button from '@/components/Button'
import { CenterContainer } from '@/components/CenterContainer'
import { Title } from '@/components/Title'
import { vars } from '@/styles/vars'
import { flex } from '@/utils/flex'
import { LogIn } from 'lucide-react'
import styled from 'styled-components'

const LoginContainer = styled.main`
	${flex('column', '', '', '10px')}
	background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
	padding: 32px;
	border: 1px solid ${(props) => props.theme.colors.primaryBorderColor};
	border-radius: ${vars.border.radius};
`

const Login = () => {
	return (
		<CenterContainer>
			<LoginContainer>
				<Title>Entrar</Title>
				<p>Insira suas credenciais para fazer o log in</p>
				
				<Button onClick={() => {}}>
					<LogIn />
					Entrar
				</Button>
			</LoginContainer>
		</CenterContainer>
	)
}

export default Login
