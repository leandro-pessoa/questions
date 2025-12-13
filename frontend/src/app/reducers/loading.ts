import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ILoading } from '@/types/ILoading'
import type { RootState } from '../store'

const initialState: ILoading = {
	isLoading: false
}

const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		setIsLoading: (state, action: PayloadAction<ILoading['isLoading']>) => {
			state.isLoading = action.payload
		}
	}
})

export default loadingSlice.reducer

export const { setIsLoading } = loadingSlice.actions

export const selectIsLoading = (state: RootState) => state.loading.isLoading

