import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultPage from './pages/DefaultPage'
import Home from './pages/Home'
import Login from './pages/Login'
import UserRegister from './pages/UserRegister'
import SendPasswordCode from './pages/ChangePassword/SendPasswordCode'
import ConfirmPasswordCode from './pages/ChangePassword/ConfirmPasswordCode'
import ChangePass from './pages/ChangePassword/ChangePass'
import User from './pages/User'
import Admin from './pages/Admin'
import Menu from './pages/Admin/Menu'
import UsersPage from './pages/Admin/UsersPage'
import QuestionsPage from './pages/Admin/QuestionsPage'
import NotFound from './pages/NotFound'

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* rota padrão */}
				<Route path='/' element={ <DefaultPage /> }>
					{/* página inicial */}
					<Route index element={ <Home /> }/>
					{/* página de login */}
					<Route path='login' element={ <Login /> }/>

					{/* rota de usuários */}
					<Route path='/usuario'>
						{/* página do usuário que está logado */}
						<Route index element={ <User /> } />
						{/* página de cadastro */}
						<Route path='cadastro' element={ <UserRegister /> }/>

						{/* rota referente à troca de senha */}
						<Route path='esqueci-minha-senha'>
							<Route path='enviar-codigo' element={ <SendPasswordCode /> }/>
							<Route path='confirmar-codigo' element={ <ConfirmPasswordCode /> }/>
							<Route path='alterar-senha' element={ <ChangePass /> }/>
						</Route>
					</Route>

					{/* rota do administrador */}
					<Route path='/admin' element={ <Admin /> }>
						<Route index element={ <Menu /> }/>
						<Route path='usuarios' element={ <UsersPage /> } />
						<Route path='questoes' element={ <QuestionsPage /> } />
					</Route>

					{/* rota para as demais páginas (página não encontrada) */}
					<Route path='*' element={ <NotFound /> }/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
