import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultPage from './pages/DefaultPage'
import Home from './pages/Home'
import Login from './pages/Login'

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={ <DefaultPage /> }>
					<Route index element={ <Home /> }/>
					<Route path='login' element={ <Login /> }/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
