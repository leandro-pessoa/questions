import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '@/types/IUser'
import type { RootState } from '../store'

interface IUserState {
	user: IUser | null
	token: string
	admin: boolean
}

const initialState: IUserState = {
	user: null,
	token: '',
	admin: false
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
		},
		setToken: (state, action: PayloadAction<IUserState['token']>) => {
			state.token = action.payload
		},
		setAdmin: (state, action: PayloadAction<boolean>) => {
			state.admin = action.payload
		},
		logout: (state) => {
			state.user = null
			state.token = ''
			state.admin = false
		}
	}
})

export default userSlice.reducer

export const { setUser, setToken, setAdmin, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const selectToken = (state: RootState) => state.user.token
export const selectAdmin = (state: RootState) => state.user.admin
