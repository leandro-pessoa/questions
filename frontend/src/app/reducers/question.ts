import { http } from '@/http'
import type { IQuestion } from '@/types/IQuestion'
import { axiosError } from '@/utils/axiosError'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface IQuestionState {
	status: 'idle' | 'succeeded' | 'pending' | 'failed'
	questions: IQuestion[] | null
	totalQuestionPages: number
}

const initialState: IQuestionState = {
	status: 'idle',
	questions: null,
	totalQuestionPages: 0
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

                // preenche o state questions caso a resposta não seja um falsy value
                if (action.payload) {
                    state.questions = [...action.payload.pageResult]
					state.totalQuestionPages = action.payload.totalPages
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
    async (pagination?: {page?: number, limit?: number, filters?: string}) => {
        // tenta obter os dados e retorna eles
        try {
			// a url get pode receber parâmetros de filtro e paginação
            const questions =
				await http.get<{pageResult: IQuestion[], totalPages: number}>(
					`/questions?page=${pagination?.page ? pagination?.page : 1}&limit=${pagination?.limit ? pagination?.limit : 10}${pagination?.filters ? `&${pagination?.filters}`: ''}`
				)
            return questions.data
        } catch (err) {
            // exibe o erro na tela e retorna uma reject
            axiosError(err)
            return Promise.reject()
        }
    },
)

export default questionSlice.reducer

export const selectQuestions = (state: RootState) => state.question.questions
export const selectQuestionsStatus = (state: RootState) => state.question.status
export const selectTotalQuestionPages = (state: RootState) => state.question.totalQuestionPages



