import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectToken } from '@/app/reducers/user'
import { useEffect, useState } from 'react'
import { selectActualPage, selectAdminUsersStatus, selectFetchLimit, selectTotalAdminUsersPages } from '@/app/reducers/adminUsers'
import { fetchAdminUsers, selectAdminUsers } from '@/app/reducers/adminUsers'
import { selectModalData, selectModalType, setModalData, setModalType } from '@/app/reducers/modal'

import Crud from '@/components/Crud'
import RemoveUser from './RemoveUser'
import UserForm from './UserForm'

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
	const modalType = useAppSelector(selectModalType)
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

	const openEditModal = (user: IUser) => {
		dispatch(setModalType('editUser'))
		dispatch(setModalData({...user}))
	}

	const openAddModal = () => {
		dispatch(setModalType('addUser'))
	}

	return (
		<>
			<RemoveUser {...modalData}/>
			{modalType === 'editUser' && <UserForm user={modalData} mode='put' />}
			{modalType === 'addUser' && <UserForm mode='post' />}
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
				editFunc={openEditModal}
				removeFunc={openRemoveModal}
				addFunc={openAddModal}
				searchUrl='searchUsers'
			/>
		</>
	)
}

export default UsersPage
