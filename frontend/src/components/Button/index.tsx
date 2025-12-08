import { StyledButton } from './styles'

interface IButtonProps {
	children: React.ReactNode | string | [React.ReactNode | string][]
	icon?: React.ReactNode
}

const Button = ({ children, icon }: IButtonProps) => {
	return (
		<>
			<StyledButton>
				{icon}
				{children}
			</StyledButton>
		</>
	)
}

export default Button
