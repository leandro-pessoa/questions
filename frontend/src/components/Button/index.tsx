import { StyledButton } from './styles'

interface IButtonProps {
	children?: React.ReactNode | string | [React.ReactNode | string][]
	icon?: React.ReactNode
	onClick: () => void
	styles?: string
}

const Button = ({ children, icon, onClick, styles }: IButtonProps) => {
	return (
		<>
			<StyledButton onClick={onClick} styles={styles}>
				{icon}
				{children}
			</StyledButton>
		</>
	)
}

export default Button
