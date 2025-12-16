import { combineReducers } from 'redux'
import themeReducer from './theme'
import loadingReducer from './loading'
import userReducer from './user'

export const rootReducer = combineReducers({
	theme: themeReducer,
	loading: loadingReducer,
	user: userReducer
})
