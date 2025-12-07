import type { ITheme } from '@/types/ITheme'
import { getTheme } from '@/utils/getTheme'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const initialState: ITheme = {
	theme: getTheme()
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === 'dark' ? 'light' : 'dark'
			localStorage.setItem('questions-theme', JSON.stringify(state.theme))
		}
	}
})

export default themeSlice.reducer

export const {
	toggleTheme
} = themeSlice.actions

export const selectTheme = (state: RootState) => state.theme.theme
