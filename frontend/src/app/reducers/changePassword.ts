import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const initialState: { email: string } = {
	email: ''
}

const changePasswordSlice = createSlice({
	name: 'changePassword',
	initialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		}
	}
})

export default changePasswordSlice.reducer

export const { setEmail } = changePasswordSlice.actions

export const selectEmail = (state: RootState) => state.changePassword.email
