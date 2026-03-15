import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectEmail } from '@/app/reducers/changePassword'
import { selectIsLoading, setIsLoading } from '@/app/reducers/loading'

import Button from '@/components/Button'
import { Container } from '@/components/Container'
import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'
import SideScreen from '@/components/SideScreen'
import { Title } from '@/components/Title'

import type { FieldValues } from 'react-hook-form'

const ConfirmPasswordCode = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const email = useAppSelector(selectEmail)
	const isLoading = useAppSelector(selectIsLoading)

	const confirmCodeHandle = async (data: FieldValues) => {
		if (isLoading) return
		try {
			dispatch(setIsLoading(true))
			await http.post('/confirmPasswordCode', { code: data.code, email })
				.then(res => {
					if (res.data.isCorrectCode) {
						navigate('/usuario/esqueci-minha-senha/alterar-senha')
					} else {
						toast.error('Código incorreto. Tente novamente nos próximos 5 minutos')
						navigate('/login')
					}
				})
		} catch (err) {
			axiosError(err)
		}
		dispatch(setIsLoading(false))
	}

	return (
		<SideScreen side='right'>
			<Container $relativeWidth='60%'>
				<Title>Confirmar código</Title>
				<Form onSubmit={confirmCodeHandle}>
					<InputContainer>
						<label htmlFor='code'>Insira o código fornecido no seu e-mail:</label>
						<FormInput
							required
							id='code'
							name='Código'
						/>
					</InputContainer>
					<Button
						type='submit'
						style={{ width: 'max-content', marginTop: '16px'}}
					>
						Confirmar código
					</Button>
				</Form>
			</Container>
		</SideScreen>
	)
}

export default ConfirmPasswordCode
