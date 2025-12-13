import styled from 'styled-components'
import { FormProvider, useForm, type FieldValues } from 'react-hook-form'

interface IFormProps {
	children: React.ReactNode | string | [React.ReactNode | string][]
	onSubmit: (data: FieldValues) => void
}

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
`

const Form = ({ children, onSubmit }: IFormProps) => {
	const methods = useForm()

	return (
		<FormProvider {...methods}>
			<StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
				{children}
			</StyledForm>
		</FormProvider>
	)
}

export default Form
