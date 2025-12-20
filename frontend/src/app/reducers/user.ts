import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '@/types/IUser'
import type { RootState } from '../store'

interface IUserState {
	user: IUser | null
	token: string
}

const initialState: IUserState = {
	user: null,
	token: ''
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
		logout: (state) => {
			state.user = null
			state.token = ''
		}
	}
})

export default userSlice.reducer

export const { setUser, setToken, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const selectToken = (state: RootState) => state.user.token
