import { http } from '@/http'
import { setToken, setUser } from '@/app/reducers/user'
import { axiosError } from '@/utils/axiosError'
import { selectIsLoading, setIsLoading } from '@/app/reducers/loading'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

import Button from '@/components/Button'
import { CenterContainer } from '@/components/CenterContainer'
import FormInput from '@/components/Input/FormInput'
import { Title } from '@/components/Title'
import { LogIn } from 'lucide-react'
import Form from '@/components/Form'
import { Container } from '@/components/Container'
import InputContainer from '@/components/Input/InputContainer'
import { StyledLink } from '@/components/Link'
import { Small } from '@/components/Small'
import ThemeButton from '@/components/Button/ThemeButton'
import { TitleLink } from '@/components/Title/TitleLink'
import { Hr } from '@/components/Hr'

import type { FieldValues } from 'react-hook-form'

const Login = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const isLoading = useAppSelector(selectIsLoading)

	const submitHandle = async (data: FieldValues) => {
		if (isLoading) return
		try {
			dispatch(setIsLoading(true))
			const res = await http.post('/users/login', { ...data })

			dispatch(setUser(res.data.user))
			dispatch(setToken(res.data.token))
			navigate('/')
		} catch (err) {
			axiosError(err)
		}
		dispatch(setIsLoading(false))
	}

	return (
		<CenterContainer $height='center-fixed'>
			<TitleLink positionFixed>
				Questions?
			</TitleLink>
			<ThemeButton fixed={true} />
			<Container $fixedWidth={true}>
				<Title>Entrar</Title>
				<Form onSubmit={submitHandle}>
					<InputContainer>
						<label htmlFor="email">E-mail</label>
						<FormInput
							id="email"
							name="E-mail"
							email={true}
							required
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor="password">Senha</label>
						<FormInput
							id="password"
							name="Senha"
							type="password"
							patternsOption={false}
							required
						/>
					</InputContainer>
					<Small style={{ textAlign: 'center', marginTop: '8px' }}>
						Esqueceu sua senha?{' '}
						<StyledLink to='/usuario/esqueci-minha-senha/enviar-codigo' $decoration>
							Altere aqui
						</StyledLink>
					</Small>
					<Hr />
					<Small style={{ textAlign: 'center' }}>
						<StyledLink to='/usuario/cadastro' $decoration>
							Cadastre-se aqui
						</StyledLink>
					</Small>
					<Button
						style={{ marginTop: '16px' }}
						type="submit"
					>
						<LogIn />
						Entrar
					</Button>
				</Form>
			</Container>
		</CenterContainer>
	)
}

export default Login
