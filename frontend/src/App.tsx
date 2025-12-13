import AppRoutes from './routes'
import { GlobalStyles } from './components/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import { useAppSelector } from './app/hooks'
import { selectTheme } from './app/reducers/theme'
import { lightTheme, darkTheme } from './styles/themeVars'
import GlobalLoading from './components/Loading'

const App = () => {
	const theme = useAppSelector(selectTheme)

	return (
		<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
			<GlobalStyles />
			<GlobalLoading />
			<AppRoutes />
		</ThemeProvider>
	)
}

export default App
