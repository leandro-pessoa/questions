import type { CSSProperties } from 'react'
import { StyledButton } from './styles'

interface IButtonProps {
	children?: React.ReactNode | string | [React.ReactNode | string][]
	icon?: React.ReactNode
	onClick?: () => void
	style?: CSSProperties
	backgroundColor?: string
	type?: 'button' | 'reset' | 'submit'
	iconButton?: boolean
	title?: string
	className?: string
	disabled?: boolean
}

const Button = ({
	children,
	icon,
	onClick,
	style,
	backgroundColor,
	type = 'button',
	iconButton = false,
	title = '',
	className = '',
	disabled = false
}: IButtonProps) => {
	return (
		<>
			<StyledButton
				onClick={onClick}
				style={{...style}}
				$backgroundColor={backgroundColor}
				type={type}
				$iconButton={iconButton}
				title={title}
				className={className}
				disabled={disabled}
			>
				{icon}
				{children}
			</StyledButton>
		</>
	)
}

export default Button
