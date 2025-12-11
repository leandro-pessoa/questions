import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'

interface IFormProps {
	children: React.ReactNode | string | [React.ReactNode | string][]
}

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
`

const Form = ({ children }: IFormProps) => {
	const methods = useForm()

	return (
		<FormProvider {...methods}>
			<StyledForm>
				{children}
			</StyledForm>
		</FormProvider>
	)
}

export default Form
