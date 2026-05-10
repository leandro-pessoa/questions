import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { ReactChildren } from '@/types/ReactChildren'

interface IModal {
	modalChildren: ReactChildren
	modalCloseElement: ReactChildren
	modalExecButton: ReactChildren
	modalTitle: string
	modalOverflow?: boolean
}

const initialState: IModal & { modalDisplay: boolean } = {
	modalDisplay: false,
	modalChildren: '',
	modalCloseElement: '',
	modalExecButton: '',
	modalTitle: '',
	modalOverflow: false
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalDisplay: (state, action: PayloadAction<boolean>) => {
			state.modalDisplay = action.payload

			if (!action.payload) state.modalOverflow = false
		},
		setModal: (state, action: PayloadAction<IModal>) => {
			state.modalChildren = action.payload.modalChildren
			state.modalCloseElement = action.payload.modalCloseElement
			state.modalExecButton = action.payload.modalExecButton
			state.modalTitle = action.payload.modalTitle
		},
		clearModal: (state) => {
			state.modalDisplay = false
			state.modalChildren = ''
			state.modalCloseElement = ''
			state.modalExecButton = ''
			state.modalTitle = ''
			state.modalOverflow = false
		},
		setModalOverflow: (state, action: PayloadAction<boolean>) => {
			state.modalOverflow = action.payload
		}
	}
})

export default modalSlice.reducer

export const { setModalDisplay, setModal, setModalOverflow, clearModal } = modalSlice.actions

export const selectModalDisplay = (state: RootState) => state.modal.modalDisplay
export const selectModalChildren = (state: RootState) => state.modal.modalChildren
export const selectModalCloseElement = (state: RootState) => state.modal.modalCloseElement
export const selectModalExecButton = (state: RootState) => state.modal.modalExecButton
export const selectModalTitle = (state: RootState) => state.modal.modalTitle
export const selectModalOverflow = (state: RootState) => state.modal.modalOverflow
