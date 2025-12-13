import { combineReducers } from 'redux'
import themeReducer from './theme'
import loadingReducer from './loading'

export const rootReducer = combineReducers({
	theme: themeReducer,
	loading: loadingReducer
})
