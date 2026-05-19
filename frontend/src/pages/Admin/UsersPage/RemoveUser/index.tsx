import { useAppSelector } from '@/app/hooks'
import { fetchAdminUsers } from '@/app/reducers/adminUsers'
import { selectModalType } from '@/app/reducers/modal'
import { useFetch } from '@/app/hooks/useFetch'
import { vars } from '@/styles/vars'

import Modal from '@/components/Modal'
import Button from '@/components/Button'

import type { IUser } from '@/types/IUser'

const RemoveUser = ({ _id, email }: Partial<IUser>) => {
	const modalType = useAppSelector(selectModalType)

	const { fetchHandle } = useFetch()

	return modalType === 'removeUser' ? (
		<Modal
			title='Remover usuário'
			closeElement='Não'
			execButton={
				// realiza a requisição de remoção de um user
				<Button
					onClick={() =>
						fetchHandle<IUser>({
							url: `/users/${_id}`,
							httpMethod: 'delete',
							refreshFunc: fetchAdminUsers, // faz o fetch dos users atualizados
							globalLoading: true,
							feedbackText: `Usuário ${_id} removido com sucesso`,
							isModal: true,
						})
					}
					backgroundColor={vars.colors.red}
				>
					Sim
				</Button>
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
