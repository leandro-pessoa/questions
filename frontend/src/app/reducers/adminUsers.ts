import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { asyncThunkFetchUrl } from '@/utils/asyncThunkFetchUrl'
import type { IUser } from '@/types/IUser'

interface IAdminUsersState {
	status: 'idle' | 'succeeded' | 'pending' | 'failed'
	adminUsers: IUser[] | null
	totalAdminUserPages: number
	totalAdminUsers: number
	actualPage: number
	fetchLimit: number
}

const initialState: IAdminUsersState = {
	status: 'idle',
	adminUsers: null,
	totalAdminUserPages: 0,
	totalAdminUsers: 0,
	actualPage: 0,
	fetchLimit: 10,
}

const adminUsersSlice = createSlice({
	name: 'adminUsers',
	initialState,
	reducers: {
		clearAdminUsers: (state) => {
			state.status = 'idle'
			state.adminUsers = null
			state.totalAdminUserPages = 0
			state.totalAdminUsers = 0
			state.actualPage = 0
			state.fetchLimit = 10
		}
	},

	// reducers que irão atualizar o estado stuatus de acordo com a promise de fetchAdminUsers
	extraReducers: (builder) => {
		builder

			// enquanto está carregando
			.addCase(fetchAdminUsers.pending, (state) => {
				state.status = 'pending'
			})

			// quando é preenchida com os dados (succsess)
			.addCase(fetchAdminUsers.fulfilled, (state, action) => {
				state.status = 'succeeded'

				// preenche o states referentes à requisição caso a resposta não seja um falsy value
				if (action.payload) {
					// verifica se a resposta é em paginação ou em um objeto
					const payload = action.payload.pageResult ? [...action.payload.pageResult] : [action.payload]

					state.adminUsers = payload as IUser[]
					state.totalAdminUserPages = action.payload.totalPages
					state.totalAdminUsers = action.payload.totalValues
					state.actualPage = action.payload.actualPage
					state.fetchLimit = action.payload.limit
				}
			})

			// quando falha a requisição
			.addCase(fetchAdminUsers.rejected, (state) => {
				state.status = 'failed'
			})
	},
})

// obtém os dados da api dos users (index)
export const fetchAdminUsers = createAsyncThunk(
	'adminUsers/fetchAdminUsers',
	async (params?:
		{
			page?: number
			limit?: number
			filters?: string
			token?: string
			search?: {
				searchUrl: string
				searchValue: string | number
				column: string
			}
		}
	) => {
		// utiliza função facilitadora
		return asyncThunkFetchUrl<IUser>(
			'/users',
			params?.token,
			params?.search,
			params
		)
	}
)

export default adminUsersSlice.reducer

export const { clearAdminUsers } = adminUsersSlice.actions

export const selectAdminUsers = (state: RootState) => state.adminUsers.adminUsers
export const selectAdminUsersStatus = (state: RootState) => state.adminUsers.status
export const selectTotalAdminUsersPages = (state: RootState) => state.adminUsers.totalAdminUserPages
export const selectTotalAdminUsers = (state: RootState) => state.adminUsers.totalAdminUsers
export const selectActualPage = (state: RootState) => state.adminUsers.actualPage
export const selectFetchLimit = (state: RootState) => state.adminUsers.fetchLimit
