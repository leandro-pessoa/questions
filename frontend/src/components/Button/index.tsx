import type { CSSProperties } from 'react'
import { StyledButton } from './styles'

interface IButtonProps {
	children?: React.ReactNode | string | [React.ReactNode | string][]
	icon?: React.ReactNode
	onClick: () => void
	style?: CSSProperties
	backgroundColor?: string
	type?: 'button' | 'reset' | 'submit'
}

const Button = ({ children, icon, onClick, style, backgroundColor, type = 'button' }: IButtonProps) => {
	return (
		<>
			<StyledButton
				onClick={onClick}
				style={{...style}}
				backgroundColor={backgroundColor}
				type={type}
			>
				{icon}
				{children}
			</StyledButton>
		</>
	)
}

export default Button
