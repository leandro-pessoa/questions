import { combineReducers } from 'redux'
import themeReducer from './theme'
import loadingReducer from './loading'
import userReducer from './user'
import questionReducer from './question'

export const rootReducer = combineReducers({
	theme: themeReducer,
	loading: loadingReducer,
	user: userReducer,
	question: questionReducer
})
