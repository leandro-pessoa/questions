import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'
import storage from 'redux-persist/lib/storage'
import {
	persistReducer,
	persistStore,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'

// configurações do persist
const persistConfig = {
	key: 'root',
	version: 1,
	storage,

	// reducers que serão persistidos
	whitelist: ['user'],
}

// os reducers são passados aqui por meio do rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,

	// algumas configurações do persist serão passadas por meio o middleware
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
			immutableCheck: false,
		}),
})

export const persistor = persistStore(store)

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
