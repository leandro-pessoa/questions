import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectToken, setToken } from '@/app/reducers/changePassword'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { selectIsLoading, setIsLoading } from '@/app/reducers/loading'

import Button from '@/components/Button'
import { Container } from '@/components/Container'
import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'
import SideScreen from '@/components/SideScreen'
import { Title } from '@/components/Title'

import type { FieldValues } from 'react-hook-form'

const ChangePass = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const token = useAppSelector(selectToken)
	const isLoading = useAppSelector(selectIsLoading)

	const sendCodeSubmitHandle = async (data: FieldValues) => {
		if (isLoading) return

		try {
			dispatch(setIsLoading(true))
			await http.put(
				'/users/updateUserPassword',
				{ ...data },
				{ headers: { Authorization: token && `Bearer ${token}` } },
			).then((res) => {
				dispatch(setToken(''))
				toast.success(res.data.message)
				navigate('/login')
			})


		} catch (err) {
			axiosError(err)
			navigate('/login')
		}
		dispatch(setIsLoading(false))
	}

	return (
		<SideScreen side='right'>
			<Container $relativeWidth='60%'>
				<Title>Alteração de senha</Title>
				<Form onSubmit={sendCodeSubmitHandle}>
					<InputContainer>
						<label htmlFor='password'>Nova senha:</label>
						<FormInput
							type='password'
							required
							placeholder='Nova senha'
							id='password'
							name='Senha'
							autoFocus
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='confirmPassword'>Confirmar nova senha:</label>
						<FormInput
							type='password'
							equalPasswordValidation
							required
							placeholder='Confirmar nova senha'
							id='confirmPassword'
							name='Confirmar senha'
						/>
					</InputContainer>
					<Button
						type='submit'
						style={{ width: 'max-content', marginTop: '16px'}}
					>
						Alterar senha
					</Button>
				</Form>
			</Container>
		</SideScreen>
	)
}

export default ChangePass
