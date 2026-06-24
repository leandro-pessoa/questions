import { combineReducers } from 'redux'
import themeReducer from './theme'
import loadingReducer from './loading'
import userReducer from './user'
import questionReducer from './question'
import filtersReducer from './filters'
import changePasswordReducer from './changePassword'
import adminUsersReducer from './adminUsers'
import modalReducer from './modal'
import crudSearch from './crudSearch'

export const rootReducer = combineReducers({
	theme: themeReducer,
	loading: loadingReducer,
	user: userReducer,
	question: questionReducer,
	filters: filtersReducer,
	changePassword: changePasswordReducer,
	adminUsers: adminUsersReducer,
	modal: modalReducer,
	crudSearch: crudSearch
})
