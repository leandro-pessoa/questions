import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface IModal {
	modalData: object
	modalType: string
}

const initialState: IModal = {
	modalData: {},
	modalType: '',
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModalType: (state, action: PayloadAction<string>) => {
			state.modalType = action.payload
		},
		setModalData: (state, action: PayloadAction<IModal['modalData']>) => {
			state.modalData = action.payload
		},

		// limpa todos os valores desse state
		clearModal: (state) => {
			state.modalData = {}
			state.modalType = ''
		}
	}
})

export default modalSlice.reducer

export const { setModalType, setModalData, clearModal } = modalSlice.actions

export const selectModalData = (state: RootState) => state.modal.modalData
export const selectModalType = (state: RootState) => state.modal.modalType
