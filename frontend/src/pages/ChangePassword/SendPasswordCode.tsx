import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setEmail } from '@/app/reducers/changePassword'
import { toast } from 'react-toastify'
import { selectIsLoading, setIsLoading } from '@/app/reducers/loading'

import Button from '@/components/Button'
import { Container } from '@/components/Container'
import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'
import SideScreen from '@/components/SideScreen'
import { Title } from '@/components/Title'

import type { FieldValues } from 'react-hook-form'

const SendPasswordCode = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isLoading = useAppSelector(selectIsLoading)

	const sendCodeSubmitHandle = async (data: FieldValues) => {
		if (isLoading) return
		try {
			dispatch(setIsLoading(true))
			await http.post('/sendChangePasswordCode', data)
				.then(() => {
					toast.success('Código enviado')
					dispatch(setEmail(data.email))
					navigate('/usuario/esqueci-minha-senha/confirmar-codigo')
				})
		} catch (err) {
			axiosError(err)
		}
		dispatch(setIsLoading(false))
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
