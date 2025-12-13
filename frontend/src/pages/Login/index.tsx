import Button from '@/components/Button'
import { CenterContainer } from '@/components/CenterContainer'
import FormInput from '@/components/Input/FormInput'
import { Title } from '@/components/Title'
import { LogIn } from 'lucide-react'
import Form from '@/components/Form'
import { LoginContainer } from './styles'
import InputContainer from '@/components/Input/InputContainer'
import { StyledLink } from '@/components/Link'
import { Small } from '@/components/Small'
import ThemeButton from '@/components/Button/ThemeButton'
import type { FieldValues } from 'react-hook-form'

const submitHandle = (data: FieldValues) => {
	console.log(data)
}

const Login = () => {
	return (
		<CenterContainer>
			<ThemeButton fixed={true}/>
			<LoginContainer>
				<Title>Entrar</Title>
				<Form onSubmit={submitHandle}>
					<InputContainer>
						<label htmlFor="email">E-mail</label>
						<FormInput id='email' name='E-mail' email={true} required/>
					</InputContainer>
					<InputContainer>
						<label htmlFor="password">Senha</label>
						<FormInput id='password' name='Senha' type='password' patternsOption={false} required/>
					</InputContainer>
					<Small style={{textAlign: 'center', marginTop: '8px'}}>
						Esqueceu sua senha? <StyledLink to='/' decoration={true}>Altere aqui</StyledLink>
					</Small>
					<Button onClick={() => {}} style={{marginTop: '16px'}} type='submit'>
						<LogIn />
						Entrar
					</Button>
				</Form>
			</LoginContainer>
		</CenterContainer>
	)
}

export default Login
