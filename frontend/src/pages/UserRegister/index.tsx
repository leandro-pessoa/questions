import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectIsLoading, setIsLoading } from '@/app/reducers/loading'
import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { toast } from 'react-toastify'

import Button from '@/components/Button'
import Form from '@/components/Form'
import { Container } from '@/components/Container'
import { Title } from '@/components/Title'
import InputContainer from '@/components/Input/InputContainer'
import FormInput from '@/components/Input/FormInput'
import SideScreen from '@/components/SideScreen'

import type { FieldValues } from 'react-hook-form'

const UserRegister = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const isLoading = useAppSelector(selectIsLoading)

	const submitHandle = async (data: FieldValues) => {
		if (isLoading) return
		try {
			dispatch(setIsLoading(true))
			await http.post('/users', { ...data })
			navigate('/login')
			toast.success('Cadastro realizado com sucesso!')
		} catch (err) {
			axiosError(err)
		}
		dispatch(setIsLoading(false))
	}

	return (
		<SideScreen>
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
		</SideScreen>
	)
}

export default UserRegister
