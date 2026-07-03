import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/app/store.ts'


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* provider do redux */}
		<Provider store={store}>
			{/* persist, para salvar alguns states globais no localstorage do navegador (ex: sessão do user) */}
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</StrictMode>,
)
