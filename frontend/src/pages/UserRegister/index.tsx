import { useFetch } from '@/app/hooks/useFetch'

import Button from '@/components/Button'
import Form from '@/components/Form'
import { Container } from '@/components/Container'
import { Title } from '@/components/Title'
import InputContainer from '@/components/Input/InputContainer'
import FormInput from '@/components/Input/FormInput'
import SideScreen from '@/components/SideScreen'

import type { FieldValues } from 'react-hook-form'

const UserRegister = () => {
	const { fetchHandle } = useFetch()

	// realiza a requisição para a url post de criação de usuários
	// utiliza os dados do formulário para isso
	const submitHandle = async (data: FieldValues) => {
		fetchHandle({
			httpMethod: 'post',
			url: '/users',
			feedbackText: 'Cadastro realizado com sucesso!',
			navigateTo: '/login',
			data: { ...data },
			globalLoading: true
		})
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
