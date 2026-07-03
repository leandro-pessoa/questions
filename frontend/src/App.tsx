import AppRoutes from './routes'
import { GlobalStyles } from './components/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import { useAppSelector } from './app/hooks'
import { selectTheme } from './app/reducers/theme'
import { lightTheme, darkTheme } from './styles/themeVars'
import GlobalLoading from './components/Loading'
import { ToastContainer } from 'react-toastify'

const App = () => {
	const theme = useAppSelector(selectTheme)

	return (
		<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
			{/* estilos globais */}
			<GlobalStyles />
			{/* container dos feedbacks */}
			<ToastContainer
				theme={theme}
				position='top-center'
				limit={2}
				autoClose={2000}
			/>
			{/* loading global (overlay) */}
			<GlobalLoading />
			{/* aplicação em si, que será renderizada de acordo com as rotas */}
			<AppRoutes />
		</ThemeProvider>
	)
}

export default App
