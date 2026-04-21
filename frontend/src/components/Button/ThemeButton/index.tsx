import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Button from '..'
import { toggleTheme, selectTheme } from '@/app/reducers/theme'
import { SunMedium, Moon } from 'lucide-react'
import type { CSSProperties } from 'react'

interface IThemeButtonProps {
	fixed?: boolean
	style?: CSSProperties
}

const ThemeButton = ({ fixed = false, style }: IThemeButtonProps) => {
	const dispatch = useAppDispatch()
	const theme = useAppSelector(selectTheme)

	return (
		<Button
			onClick={() => dispatch(toggleTheme())}
			style={{
				position: fixed ? 'fixed' : 'static',
				top: fixed ? '16px' : 'auto',
				right: fixed ? '16px' : 'auto',
				...style
			}}
			iconButton
			title='Mudar tema'
		>
			{theme === 'dark' ? <Moon /> : <SunMedium />}
		</Button>
	)
}

export default ThemeButton
