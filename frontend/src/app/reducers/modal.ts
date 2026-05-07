import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { ReactChildren } from '@/types/ReactChildren'

interface IModal {
	modalChildren: ReactChildren
	modalCloseElement: ReactChildren
	modalExecButton: ReactChildren
	modalTitle: string
}

const initialState: IModal & { modalDisplay: boolean } = {
	modalDisplay: false,
	modalChildren: '',
	modalCloseElement: '',
	modalExecButton: '',
	modalTitle: ''
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalDisplay: (state, action: PayloadAction<boolean>) => {
			state.modalDisplay = action.payload
		},
		setModal: (state, action: PayloadAction<IModal>) => {
			state.modalChildren = action.payload.modalChildren
			state.modalCloseElement = action.payload.modalCloseElement
			state.modalExecButton = action.payload.modalExecButton
			state.modalTitle = action.payload.modalTitle
		},
	}
})

export default modalSlice.reducer

export const { setModalDisplay, setModal } = modalSlice.actions

export const selectModalDisplay = (state: RootState) => state.modal.modalDisplay
export const selectModalChildren = (state: RootState) => state.modal.modalChildren
export const selectModalCloseElement = (state: RootState) => state.modal.modalCloseElement
export const selectModalExecButton = (state: RootState) => state.modal.modalExecButton
export const selectModalTitle = (state: RootState) => state.modal.modalTitle
