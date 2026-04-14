import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setIsLoading } from "@/app/reducers/loading"
import { selectToken } from "@/app/reducers/user"
import { http } from "@/http"
import { axiosError } from "@/utils/axiosError"
import { useEffect } from "react"

import Header from "@/components/Header"
import { Outlet, useNavigate } from "react-router-dom"

const Admin = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const token = useAppSelector(selectToken)

	useEffect(() => {
		// verifica o acesso do user ao entrar em alguma página de admin
		const verifyAccess = async () => {
			try {
				// loading
				dispatch(setIsLoading(true))

				// requisição para o server checar o acesso
				const res =
					await http.get('/access',
						{ headers: { Authorization: token && `Bearer ${token}`}}
					)

				// caso dê algum erro, lança ele para o catch
				if (res.status !== 200) {
					throw new Error()
				}
			} catch (err) { // navega para a para a página de login e exibe a mensagem
				navigate('/login')
				axiosError(err)
			}

			// loading
			dispatch(setIsLoading(false))
		}

		verifyAccess()
	}, [dispatch, navigate, token])

	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}

export default Admin
