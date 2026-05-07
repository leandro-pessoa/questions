import type { IUser } from '@/types/IUser'

const RemoveUser = ({ _id, email }: Partial<IUser>) => {
	return (
		<div>
			Tem certeza que deseja excluir o usuário de email {email} e id {_id} ?
		</div>
	)
}

export default RemoveUser
