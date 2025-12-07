import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultPage from './pages/DefaultPage'
import Home from './pages/Home'

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={ <DefaultPage /> }>
					<Route index element={ <Home /> }/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
