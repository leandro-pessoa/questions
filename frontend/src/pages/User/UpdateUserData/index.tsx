import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectUser, setUser } from '@/app/reducers/user'
import { useFetch } from '@/app/hooks/useFetch'

import Button from '@/components/Button'
import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'

import type { FieldValues } from 'react-hook-form'

const UpdateUserData = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)

	const { fetchHandle } = useFetch()

	// irá fazer a requisição para o servidor com os dados do formulário
	const submitHandle = async (data: FieldValues) => {
		// verifica se o email foi alterado
		// caso não, não envia ele no corpo da requisição
		if (data.email === user?.email) {
			delete data.email
		}

		fetchHandle({
			httpMethod: 'put',
			url: '/users',
			feedbackText: 'Dados alterados com sucesso!',
			then: (res) => dispatch(setUser(res.data)),
			data: { ...data },
			globalLoading: true,
		})
	}

	return (
		<Form onSubmit={submitHandle} grid={true}>
			<InputContainer>
				<label htmlFor='completeName'>Nome completo</label>
				<FormInput
					id='completeName'
					name='Nome completo'
					required
					minLength={3}
					maxLength={60}
					value={user?.completeName}
				/>
			</InputContainer>
			<InputContainer>
				<label htmlFor='email'>E-mail</label>
				<FormInput
					id='email'
					name='E-mail'
					email={true}
					required
					value={user?.email}
				/>
			</InputContainer>
			<Button type='submit' style={{ width: 'max-content' }}>
				Atualizar dados
			</Button>
		</Form>
	)
}

export default UpdateUserData
