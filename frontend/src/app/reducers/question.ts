import type { IQuestion } from '@/types/IQuestion'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { asyncThunkFetchUrl } from '@/utils/asyncThunkFetchUrl'

interface IQuestionState {
	status: 'idle' | 'succeeded' | 'pending' | 'failed'
	questions: IQuestion[] | null
	totalQuestionPages: number
	totalQuestions: number
	actualPage: number
	fetchLimit: number
}

const initialState: IQuestionState = {
	status: 'idle',
	questions: null,
	totalQuestionPages: 0,
	totalQuestions: 0,
	actualPage: 0,
	fetchLimit: 10
}

const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {

	},

	// reducers que irão atualizar o estado stuatus de acordo com a promise de fetchQuestions
    extraReducers: (builder) => {
        builder

            // enquanto está carregando
            .addCase(fetchQuestions.pending, (state) => {
                state.status = 'pending'
            })

            // quando é preenchida com os dados (succsess)
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = 'succeeded'

                // preenche o states referentes à requisição caso a resposta não seja um falsy value
                if (action.payload) {
					// verifica se a resposta é em paginação ou em um objeto
					const payload = action.payload.pageResult ? [...action.payload.pageResult] : [action.payload]

                    state.questions = payload as IQuestion[]
					state.totalQuestionPages = action.payload.totalPages
					state.totalQuestions = action.payload.totalValues
					state.actualPage = action.payload.actualPage
					state.fetchLimit = action.payload.limit
                }
            })

            // quando falha a requisição
            .addCase(fetchQuestions.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

// obtém os dados da api dos questions (index)
export const fetchQuestions = createAsyncThunk(
    'question/fetchQuestions',
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
		return asyncThunkFetchUrl<IQuestion>(
			'/questions',
			params?.token,
			params?.search,
			params
		)
	}
)

export default questionSlice.reducer

export const selectQuestions = (state: RootState) => state.question.questions
export const selectQuestionsStatus = (state: RootState) => state.question.status
export const selectTotalQuestionPages = (state: RootState) => state.question.totalQuestionPages
export const selectTotalQuestions = (state: RootState) => state.question.totalQuestions
export const selectActualPage = (state: RootState) => state.question.actualPage
export const selectFetchLimit = (state: RootState) => state.question.fetchLimit
