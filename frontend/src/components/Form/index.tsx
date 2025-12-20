import styled from 'styled-components'
import { FormProvider, useForm, type FieldValues } from 'react-hook-form'
import { vars } from '@/styles/vars'

interface IFormProps {
	children: React.ReactNode | string | [React.ReactNode | string][]
	onSubmit: (data: FieldValues) => void
	grid?: boolean
}

interface IStyledFormProps {
	readonly $grid?: boolean
}

const StyledForm = styled.form<IStyledFormProps>`
	display: flex;
	flex-direction: column;

	${({ $grid = false }) => $grid && `
		@media screen and (min-width: ${vars.breakpoints.tablet}) {
			display: grid;
			grid-template-columns: auto auto;
			gap: 16px;
		}
	`}
`

const Form = ({ children, onSubmit, grid = false }: IFormProps) => {
	const methods = useForm()

	return (
		<FormProvider {...methods}>
			<StyledForm onSubmit={methods.handleSubmit(onSubmit)} $grid={grid}>
				{children}
			</StyledForm>
		</FormProvider>
	)
}

export default Form
