import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultPage from './pages/DefaultPage'
import Home from './pages/Home'
import Login from './pages/Login'
import UserRegister from './pages/UserRegister'
import SendPasswordCode from './pages/ChangePassword/SendPasswordCode'
import ConfirmPasswordCode from './pages/ChangePassword/ConfirmPasswordCode'
import ChangePass from './pages/ChangePassword/ChangePass'
import User from './pages/User'

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={ <DefaultPage /> }>
					<Route index element={ <Home /> }/>
					<Route path='login' element={ <Login /> }/>

					<Route path='/usuario'>
						<Route index element={ <User /> } />
						<Route path='cadastro' element={ <UserRegister /> }/>
						<Route path='esqueci-minha-senha'>
							<Route path='enviar-codigo' element={ <SendPasswordCode /> }/>
							<Route path='confirmar-codigo' element={ <ConfirmPasswordCode /> }/>
							<Route path='alterar-senha' element={ <ChangePass /> }/>
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
