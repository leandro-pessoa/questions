import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Button from '..'
import { toggleTheme, selectTheme } from '@/app/reducers/theme'
import { SunMedium, Moon } from 'lucide-react'

interface IThemeButtonProps {
	fixed?: boolean
}

const ThemeButton = ({ fixed = false }: IThemeButtonProps) => {
	const dispatch = useAppDispatch()
	const theme = useAppSelector(selectTheme)

	return (
		<Button
			onClick={() => dispatch(toggleTheme())}
			backgroundColor='transparent'
			style={{
				position: fixed ? 'fixed' : 'static',
				top: fixed ? '16px' : 'auto',
				right: fixed ? '16px' : 'auto',
			}}
		>
			{theme === 'dark' ? <Moon /> : <SunMedium />}
		</Button>
	)
}

export default ThemeButton
