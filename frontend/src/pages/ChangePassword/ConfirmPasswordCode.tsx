import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectEmail, setToken } from '@/app/reducers/changePassword'
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

const ConfirmPasswordCode = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { fetchHandle } = useFetch()

	const email = useAppSelector(selectEmail)

	const confirmCodeHandle = async (data: FieldValues, e: BaseSyntheticEvent<object> | undefined) => {
		// faz a requisição enviando o código de confirmação
		fetchHandle({
			httpMethod: 'post',
			url: '/confirmPasswordCode',
			then: (res) => {
				if (res.data.isCorrectCode) { // caso seja o código correto
					// armazena o código no state global e navega para a alteração
					dispatch(setToken(res.data.token))
					navigate('/usuario/esqueci-minha-senha/alterar-senha')
				} else { // lança o feedback de erro e volta para a página de login
					toast.error('Código incorreto. Tente novamente nos próximos 5 minutos')
					navigate('/login')
				}
			},
			data: { code: data.code, email }, // envia o código e o email do user
			globalLoading: true,
		})

		// limpa o formulário
		const target = e?.target as HTMLFormElement
		target.reset()
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
							autoFocus
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
