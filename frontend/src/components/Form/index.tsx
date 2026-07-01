import styled from 'styled-components'
import { FormProvider, useForm, type FieldValues } from 'react-hook-form'
import { vars } from '@/styles/vars'

import type { BaseSyntheticEvent } from 'react'
import type { ReactChildren } from '@/types/ReactChildren'

interface IFormProps {
	children: ReactChildren
	onSubmit: (data: FieldValues, e: BaseSyntheticEvent<object> | undefined) => void
	grid?: boolean
	className?: string
}

interface IStyledFormProps {
	readonly $grid?: boolean
}

const StyledForm = styled.form<IStyledFormProps>`
	display: flex;
	flex-direction: column;

	// caso a prop $grid seja true, irá adicionar um grid layout para o formulário
	${({ $grid = false }) => $grid && `
		@media screen and (min-width: ${vars.breakpoints.tablet}) {
			display: grid;
			grid-template-columns: auto auto;
			gap: 16px;
		}
	`}
`

const Form = ({ children, onSubmit, grid = false, className }: IFormProps) => {
	const methods = useForm()

	return (
		<FormProvider {...methods}>
			<StyledForm
				onSubmit={methods.handleSubmit(onSubmit)}
				$grid={grid}
				className={className}
			>
				{children}
			</StyledForm>
		</FormProvider>
	)
}

export default Form
