import { StyledButton } from './styles'

interface IButtonProps {
	children?: React.ReactNode | string | [React.ReactNode | string][]
	icon?: React.ReactNode
	onClick: () => void
}

const Button = ({ children, icon, onClick }: IButtonProps) => {
	return (
		<>
			<StyledButton onClick={onClick}>
				{icon}
				{children}
			</StyledButton>
		</>
	)
}

export default Button
