import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectToken } from '@/app/reducers/user'
import { useEffect, useState } from 'react'
import { selectActualPage, selectAdminUsersStatus, selectFetchLimit, selectTotalAdminUsersPages } from '@/app/reducers/adminUsers'
import { fetchAdminUsers, selectAdminUsers } from '@/app/reducers/adminUsers'
import { selectModalData, setModalData, setModalType } from '@/app/reducers/modal'

import Crud from '@/components/Crud'
import RemoveUser from './RemoveUser'

import type { IUser } from '@/types/IUser'

const UsersPage = () => {
	const dispatch = useAppDispatch()

	const token = useAppSelector(selectToken)
	const users = useAppSelector(selectAdminUsers)
	const usersStatus = useAppSelector(selectAdminUsersStatus)
	const adminUsersLimit = useAppSelector(selectFetchLimit)
	const adminUsersActualPage = useAppSelector(selectActualPage)
	const adminUsersTotalPages = useAppSelector(selectTotalAdminUsersPages)
	const modalData = useAppSelector(selectModalData) as IUser
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

	const openRemoveModal = ({ _id, email }: Partial<IUser>) => {
		dispatch(setModalType('removeUser'))
		dispatch(setModalData({ _id, email }))
	}

	return (
		<>
			<RemoveUser {...modalData}/>
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
				actualPage={adminUsersActualPage}
				limit={adminUsersLimit}
				totalPages={adminUsersTotalPages}
				editFunc={() => {}}
				removeFunc={openRemoveModal}
			/>
		</>
	)
}

export default UsersPage
