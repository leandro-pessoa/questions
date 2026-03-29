import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectIsLoading, setIsLoading } from "@/app/reducers/loading"
import { selectToken, selectUser, setUser } from "@/app/reducers/user"
import { http } from "@/http"
import { axiosError } from "@/utils/axiosError"
import { toast } from "react-toastify"

import Button from "@/components/Button"
import Form from "@/components/Form"
import FormInput from "@/components/Input/FormInput"
import InputContainer from "@/components/Input/InputContainer"

import type { FieldValues } from "react-hook-form"

const UpdateUserData = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)
	const token = useAppSelector(selectToken)
	const isLoading = useAppSelector(selectIsLoading)

	// irá fazer a requisição para o servidor com os dados do formulário
	const submitHandle = async (data: FieldValues) => {
		// não faz nada caso esteja carregando
		if (isLoading) return

		// verifica se o email foi alterado
		// caso não, não envia ele no corpo da requisição
		if (data.email === user?.email) {
			delete data.email
		}

		try {
			// loading
			dispatch(setIsLoading(true))

			// requisição com os dados informados e o token do user logado
			await http.put(
				'/users',
				{ ...data },
				{ headers: { Authorization: token && `Bearer ${token}` } }
			)
				.then((res) => { // feedback e alteração do state do user global
					toast.success('Dados alterados com sucesso!')
					dispatch(setUser(res.data))
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
				<label htmlFor='completeName'>
					Nome completo
				</label>
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
