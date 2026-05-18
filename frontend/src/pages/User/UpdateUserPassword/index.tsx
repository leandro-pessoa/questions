import { useFetch } from '@/app/hooks/useFetch'

import Button from '@/components/Button'
import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'

import { type FieldValues } from 'react-hook-form'
import { type BaseSyntheticEvent } from 'react'

const UpdateUserPassword = () => {
	const { fetchHandle } = useFetch()

	// irá fazer a requisição para o servidor com os dados do formulário
	const submitHandle = async (
		data: FieldValues,
		e: BaseSyntheticEvent<object> | undefined,
	) => {
		// target do evento
		const target = e?.target as HTMLFormElement

		fetchHandle({
			httpMethod: 'put',
			url: '/users',
			feedbackText: 'Senha alterada com sucesso!',
			then: () => {
				target.reset()
			},
			data: { ...data },
			globalLoading: true,
		})
	}

	return (
		<Form onSubmit={submitHandle} grid={true}>
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
			<Button type='submit' style={{ width: 'max-content' }}>
				Alterar senha
			</Button>
		</Form>
	)
}

export default UpdateUserPassword
