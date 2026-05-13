import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface IModal {
	modalData: object
	modalOverflow?: boolean
	modalType: string
}

const initialState: IModal = {
	modalData: {},
	modalOverflow: false,
	modalType: '',
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalType: (state, action: PayloadAction<string>) => {
			state.modalType = action.payload

			if (!action.payload) state.modalOverflow = false
		},
		setModalData: (state, action: PayloadAction<IModal['modalData']>) => {
			state.modalData = action.payload
		},
		clearModal: (state) => {
			state.modalData = {}
			state.modalType = ''
			state.modalOverflow = false
		},
		setModalOverflow: (state, action: PayloadAction<boolean>) => {
			state.modalOverflow = action.payload
		}
	}
})

export default modalSlice.reducer

export const { setModalType, setModalData, setModalOverflow, clearModal } = modalSlice.actions

export const selectModalData = (state: RootState) => state.modal.modalData
export const selectModalType = (state: RootState) => state.modal.modalType
export const selectModalOverflow = (state: RootState) => state.modal.modalOverflow
