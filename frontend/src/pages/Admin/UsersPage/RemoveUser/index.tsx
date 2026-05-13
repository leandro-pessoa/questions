import { useAppSelector } from '@/app/hooks'
import { fetchAdminUsers } from '@/app/reducers/adminUsers'
import { selectModalType } from '@/app/reducers/modal'

import FetchButton from '@/components/FetchButton'
import Modal from '@/components/Modal'

import type { IUser } from '@/types/IUser'

const RemoveUser = ({ _id, email }: Partial<IUser>) => {
	const modalType = useAppSelector(selectModalType)

	return modalType === 'removeUser' ? (
		<Modal
			title='Remover usuário'
			closeElement='Não'
			execButton={
				<FetchButton
					isModal
					httpMethod='delete'
					url={`/users/${_id}`}
					refreshFunc={fetchAdminUsers}
					feedbackText={`Usuário ${_id} removido com sucesso`}
				>
					Sim
				</FetchButton>
			}
		>
			Tem certeza que deseja excluir o usuário de email {email} e id {_id}{' '}
			?
		</Modal>
	) : (
		<></>
	)
}

export default RemoveUser
