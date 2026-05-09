import { useFormContext } from 'react-hook-form'

import { StyledTextarea } from './styles'
import { Small } from '../Small'

import type { CSSProperties } from 'react'

interface TextareaProps {
	id: string
	name: string
	required?: boolean
	maxLength?: number
	minLength?: number
	value?: string
	style?: CSSProperties
}

const Textarea = ({
	id,
	name,
	required = false,
	maxLength = 30,
	minLength = 0,
	value,
	style,
}: TextareaProps) => {
	// métodos e atributos do react-hook-form
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<>
			<StyledTextarea
				maxLength={maxLength}
				style={style}
				$error={!(errors[id]?.message === undefined)}
				{...register(id, {
					// validações do react-hook-form
					required: {
						value: required,
						message: `O campo ${name} é obrigatório`,
					},
					// verifica a quantidade mínima de caracteres
					minLength: {
						value: minLength,
						message: `Mínimo de ${minLength} caracteres`,
					},
					value,
				})}
			/>
			{/* container onde as mensagens de erro serão exibidas, de acordo com a prioridade (de cima para baixo) */}
			<div>
				{errors[id] &&
					(errors[id]?.type === 'required' ||
						errors[id]?.type === 'minLength' ||
						errors[id]?.type === 'maxLength') && (
						// caso exista algum erro, a mensagem será exibida no container
						<Small $error={true}>
							{errors[id]?.message?.toString()}
						</Small>
					)}
			</div>
		</>
	)
}

export default Textarea
