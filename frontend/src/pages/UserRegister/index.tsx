import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { setIsLoading } from '@/app/reducers/loading'
import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { toast } from 'react-toastify'

import Button from '@/components/Button'
import ThemeButton from '@/components/Button/ThemeButton'
import { CenterContainer } from '@/components/CenterContainer'
import Form from '@/components/Form'
import { RegisterContainer } from './styles'
import { Container } from '@/components/Container'
import { Title } from '@/components/Title'
import InputContainer from '@/components/Input/InputContainer'
import FormInput from '@/components/Input/FormInput'
import { ArrowLeft } from 'lucide-react'

import type { FieldValues } from 'react-hook-form'

const UserRegister = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const submitHandle = async (data: FieldValues) => {
		dispatch(setIsLoading(true))
		try {
			await http.post('/users', { ...data })
			navigate('/login')
			toast.success('Cadastro realizado com sucesso!')
		} catch (err) {
			axiosError(err)
		}
		dispatch(setIsLoading(false))
	}

	return (
		<>
			<RegisterContainer>
				<div className='empty-container'></div>
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
					<Container>
						<Title>Cadastre-se</Title>
						<Form onSubmit={submitHandle} grid={true}>
							<InputContainer>
								<label htmlFor='completeName'>
									Nome completo
								</label>
								<FormInput
									id='completeName'
									name='Nome completo'
									required
									minLength={3}
									maxLength={60}
								/>
							</InputContainer>
							<InputContainer>
								<label htmlFor='email'>E-mail</label>
								<FormInput
									id='email'
									name='E-mail'
									email={true}
									required
								/>
							</InputContainer>
							<InputContainer>
								<label htmlFor='password'>Senha</label>
								<FormInput
									type='password'
									id='password'
									name='Senha'
									patternsOption={true}
									required
								/>
							</InputContainer>
							<InputContainer>
								<label htmlFor='email'>Confirmar senha</label>
								<FormInput
									type='password'
									id='confirmPassword'
									name='Confirmar senha'
									patternsOption={true}
									equalPasswordValidation={true}
									required
								/>
							</InputContainer>
							<Button type='submit'>Cadastrar</Button>
						</Form>
					</Container>
				</CenterContainer>
			</RegisterContainer>
		</>
	)
}

export default UserRegister
