import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectToken, setToken } from '@/app/reducers/changePassword'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '@/app/hooks/useFetch'

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
	const { fetchHandle } = useFetch()

	const token = useAppSelector(selectToken)

	const changePassSubmitHandle = async (data: FieldValues) => {
		// faz uma requisição que irá alterar a senha do usuário
		fetchHandle({
			httpMethod: 'put',
			url: '/users/updateUserPassword',
			then: (res) => { // limpa o token e manda o feedback
				dispatch(setToken(''))
				toast.success(res.data.message)
			},
			data: { ...data },
			navigateTo: '/login',
			globalLoading: true,
			catchFunc: () => navigate('/login'),
			otherToken: token // utiliza o token de alteração de senha (não o de login)
		})
	}

	return (
		<SideScreen side='right'>
			<Container $relativeWidth='60%'>
				<Title>Alteração de senha</Title>
				<Form onSubmit={changePassSubmitHandle}>
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
