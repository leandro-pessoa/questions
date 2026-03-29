import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectIsLoading, setIsLoading } from "@/app/reducers/loading"
import { http } from "@/http"
import { axiosError } from "@/utils/axiosError"
import { toast } from "react-toastify"
import { selectToken } from "@/app/reducers/user"

import Button from "@/components/Button"
import Form from "@/components/Form"
import FormInput from "@/components/Input/FormInput"
import InputContainer from "@/components/Input/InputContainer"

import { type FieldValues } from "react-hook-form"
import { type BaseSyntheticEvent } from "react"

const UpdateUserPassword = () => {
	const dispatch = useAppDispatch()
	const token = useAppSelector(selectToken)
	const isLoading = useAppSelector(selectIsLoading)

	// irá fazer a requisição para o servidor com os dados do formulário
	const submitHandle = async (data: FieldValues, e: BaseSyntheticEvent<object> | undefined) => {
		// target do evento
		const target = e?.target as HTMLFormElement

		// não faz nada caso esteja no loading
		if (isLoading) return

		try {
			// loading
			dispatch(setIsLoading(true))

			// faz a requisição com a nova senha e o token do user logado
			await http.put(
				'/users',
				{ ...data },
				{ headers: { Authorization: token && `Bearer ${token}` } }
			)
				.then(() => { // feedback de sucesso e reset do form
					toast.success('Senha alterada com sucesso!')
					target.reset()
				})
		} catch (err) { // handle dos erros
			axiosError(err)
		}

		// loading
		dispatch(setIsLoading(false))
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
