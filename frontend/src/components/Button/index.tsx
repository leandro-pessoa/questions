import type { CSSProperties } from 'react'
import { StyledButton } from './styles'

interface IButtonProps {
	children?: React.ReactNode | string | [React.ReactNode | string][]
	icon?: React.ReactNode
	onClick: () => void
	style?: CSSProperties
	backgroundColor?: string
}

const Button = ({ children, icon, onClick, style, backgroundColor }: IButtonProps) => {
	return (
		<>
			<StyledButton onClick={onClick} style={{...style}} backgroundColor={backgroundColor}>
				{icon}
				{children}
			</StyledButton>
		</>
	)
}

export default Button
