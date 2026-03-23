import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const initialState: { email: string, token: string } = {
	email: '',
	token: ''
}

const changePasswordSlice = createSlice({
	name: 'changePassword',
	initialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload
		}
	}
})

export default changePasswordSlice.reducer

export const { setEmail } = changePasswordSlice.actions
export const { setToken } = changePasswordSlice.actions

export const selectEmail = (state: RootState) => state.changePassword.email
export const selectToken = (state: RootState) => state.changePassword.token
