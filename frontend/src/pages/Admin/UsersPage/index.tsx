import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectToken } from '@/app/reducers/user'
import { useEffect, useState } from 'react'
import { selectAdminUsersStatus } from '@/app/reducers/adminUsers'
import { fetchAdminUsers, selectAdminUsers } from '@/app/reducers/adminUsers'

import Crud from '@/components/Crud'

const UsersPage = () => {
	const dispatch = useAppDispatch()

	const token = useAppSelector(selectToken)
	const users = useAppSelector(selectAdminUsers)
	const usersStatus = useAppSelector(selectAdminUsersStatus)
	// state do loading local
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const getQuestions = () => {
			// obtém as questões, caso não estejam no state global
			if (!users || users.length === 0) {
				setLoading(true)
				dispatch(fetchAdminUsers({token: token}))
				setLoading(false)
			}
		}
		getQuestions()
		}, [users, dispatch, token])

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
			dataStatus={usersStatus}
			fetchFunc={fetchAdminUsers}
		/>
	)
}

export default UsersPage
