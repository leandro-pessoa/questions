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
	// state do loading local
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
			// irá obter todos os usuários
			// requer o token e sessão de admin no server
			const getUsers = async () => {
				try {
					setLoading(true)
					const res = await http.get('/users', {
						headers: { Authorization: token && `Bearer ${token}` },
					})
					// faz o set no state local
					setUsers(res.data.pageResult)
				} catch (err) {
					axiosError(err)
				}
				setLoading(false)
			}

			getUsers()
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
			localLoading={loading}
			data={users || []}
		/>
	)
}

export default UsersPage
