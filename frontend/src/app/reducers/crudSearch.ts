import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface ICrudSearch {
	crudsearchValue: string
	crudSearchColumn: string
	crudSearchLimit: number
}

const initialState: ICrudSearch = {
	crudsearchValue: '',
	crudSearchColumn: '',
	crudSearchLimit: 10,
}

const crudSearchSlice = createSlice({
	name: 'crudSearch',
	initialState,
	reducers: {
		setCrudSearchValue: (state, action: PayloadAction<string>) => {
			state.crudsearchValue = action.payload
		},

		setCrudSearchColumn: (state, action: PayloadAction<string>) => {
			state.crudSearchColumn = action.payload
		},

		setCrudSearchLimit: (state, action: PayloadAction<number>) => {
			state.crudSearchLimit = action.payload
		},

		clearCrudFilters: (state) => {
			state.crudSearchColumn = ''
			state.crudSearchLimit = 10
			state.crudsearchValue = ''
		},
	},
})

export default crudSearchSlice.reducer

export const {
	setCrudSearchValue,
	setCrudSearchColumn,
	setCrudSearchLimit,
	clearCrudFilters,
} = crudSearchSlice.actions

export const selectCrudSearchValue = (state: RootState) =>
	state.crudSearch.crudsearchValue
export const selectCrudSearchColumn = (state: RootState) =>
	state.crudSearch.crudSearchColumn
export const selectCrudSearchLimit = (state: RootState) =>
	state.crudSearch.crudSearchLimit
