import { useState } from 'react'
import { useFetch } from '@/app/hooks/useFetch'
import { fetchAdminUsers } from '@/app/reducers/adminUsers'

import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'
import Modal from '@/components/Modal'
import ModalButtonsDiv from '@/components/ModalButtonsDiv'
import Select from '@/components/Select'

import type { IUser } from '@/types/IUser'
import type { FieldValues } from 'react-hook-form'

// avaliar a possibilidade de inserir a opção de colocar um user como admin nesse componente

const UserForm = ({ user, mode }: { user?: IUser; mode: 'put' | 'post' }) => {
	const [role, setRole] = useState<string>('default')

	const { fetchHandle } = useFetch()

	const submitHandle = (data: FieldValues) => {
		// realiza a criação ou a alteração de um usuário, de acordo com o modo
		fetchHandle({
			isModal: true,
			httpMethod: mode,
			url: `/users${mode === 'put' ? `/${user?._id}` : ''}`,
			refreshFunc: fetchAdminUsers,
			feedbackText:
				mode === 'put' ?
					`Usuário ${user?._id} alterado com sucesso`
				:
					'Usuário criado com sucesso'
				,
			data: { ...data, role } as IUser & { role: 'default' | 'admin' },
			globalLoading: true
		})
	}

	return (
		<Modal
			title={mode === 'put' ? 'Atualizar usuário' : 'Adicionar usuário'}
		>
			<Form onSubmit={submitHandle} grid>
				<InputContainer style={{ gridColumn: '1 / 3' }}>
					<label htmlFor='role'>Regra</label>
					<Select
						options={['admin', 'default']}
						selectedOption={user?.role || role}
						setSelectedOption={setRole}
						id='role'
						style={{ marginBottom: '12px' }}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='completeName'>Nome completo</label>
					<FormInput
						required
						id='completeName'
						name='Nome completo'
						minLength={3}
						maxLength={60}
						value={user?.completeName || ''}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='email'>E-mail</label>
					<FormInput
						id='email'
						name='E-mail'
						email={true}
						required
						value={user?.email || ''}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='password'>Senha</label>
					<FormInput
						type='password'
						id='password'
						name='Senha'
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='confirmPassword'>Confirmar senha</label>
					<FormInput
						type='password'
						equalPasswordValidation
						id='confirmPassword'
						name='Confirmar senha'
					/>
				</InputContainer>
				<ModalButtonsDiv mode={mode} />
			</Form>
		</Modal>
	)
}

export default UserForm
