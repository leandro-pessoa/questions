import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'
import Modal from '@/components/Modal'
import ModalButtonsDiv from '@/components/ModalButtonsDiv'
import Select from '@/components/Select'

import type { IUser } from '@/types/IUser'
import type { FieldValues } from 'react-hook-form'

// finalizar esse componente
// avaliar a possibilidade de inserir a opção de colocar um user como admin nesse componente

const UserForm = ({ user, mode }: { user?: IUser; mode: 'put' | 'post' }) => {
	const submitHandle = (data: FieldValues) => {}

	return (
		<Modal
			title={mode === 'put' ? 'Atualizar usuário' : 'Adicionar usuário'}
		>
			<Form onSubmit={submitHandle}>
				<InputContainer>
					<label htmlFor='role'>Regra</label>
					<Select
						options={['admin', 'default']}
						defaultValue='default'
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
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='email'>E-mail</label>
					<FormInput id='email' name='E-mail' email={true} required />
				</InputContainer>
				<InputContainer>
					<label htmlFor='password'>Senha</label>
					<FormInput
						type='password'
						required
						id='password'
						name='Senha'
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='confirmPassword'>Confirmar senha</label>
					<FormInput
						type='password'
						equalPasswordValidation
						required
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
