import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectToken } from '@/app/reducers/user'
import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { useEffect, useState } from 'react'

import Crud from '@/components/Crud'

import type { IUser } from '@/types/IUser'

const UsersPage = () => {
	const dispatch = useAppDispatch()

	const token = useAppSelector(selectToken)
	const [users, setUsers] = useState<IUser[]>([])

	useEffect(() => {
		try {
			// irá obter todos os usuários
			// requer o token e sessão de admin no server
			const getUsers = async () => {
				const res = await http.get('/users', {
					headers: { Authorization: token && `Bearer ${token}` },
				})
				// faz o set no state local
				setUsers(res.data.pageResult)
			}

			getUsers()
		} catch (err) {
			axiosError(err)
		}
	}, [token, dispatch])

	return (
		<Crud
			labels={[
				'ID',
				'Papel',
				'Nome completo',
				'E-mail',
				'N° Questões',
			]}
			data={users || []}
		/>
	)
}

export default UsersPage
