import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { setEmail } from '@/app/reducers/changePassword'
import { useFetch } from '@/app/hooks/useFetch'

import Button from '@/components/Button'
import { Container } from '@/components/Container'
import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'
import SideScreen from '@/components/SideScreen'
import { Title } from '@/components/Title'

import type { FieldValues } from 'react-hook-form'
import type { BaseSyntheticEvent } from 'react'

const SendPasswordCode = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { fetchHandle } = useFetch()

	const sendCodeSubmitHandle = async (data: FieldValues, e: BaseSyntheticEvent<object> | undefined) => {
		// requisição que irá enviar o código para o email do user
		fetchHandle({
			httpMethod: 'post',
			url: '/sendChangePasswordCode',
			then: () => { // insere o email no state global e navega para a confirmação do código
				dispatch(setEmail(data.email))
				navigate('/usuario/esqueci-minha-senha/confirmar-codigo')
			},
			data: { ...data },
			feedbackText: 'Código enviado',
			globalLoading: true,
			catchFunc: () => navigate('/login'),
		})

		// limpa o input
		const target = e?.target as HTMLFormElement
		target.reset()
	}

	return (
		<SideScreen side='right'>
			<Container $relativeWidth='60%'>
				<Title>Enviar código</Title>
				<Form onSubmit={sendCodeSubmitHandle}>
					<InputContainer>
						<label htmlFor='email'>Informe seu e-mail:</label>
						<FormInput
							email
							required
							placeholder='Ex: exemplo@dominio.com'
							id='email'
							name='E-mail'
							autoFocus
						/>
					</InputContainer>
					<Button
						type='submit'
						style={{ width: 'max-content', marginTop: '16px'}}
					>
						Enviar código
					</Button>
				</Form>
			</Container>
		</SideScreen>
	)
}

export default SendPasswordCode
