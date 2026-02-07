import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { IFilter } from "@/types/IFilter"

interface IFilters {
	selectedFilters: IFilter[]
	limit: number
	previousLimit: number
}

const initialState: IFilters = {
	selectedFilters: [],
	limit: 10,
	previousLimit: 10
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		// irá adicionar objetos ou remover valores da lista do objeto adicionado com um clique
		toggleCheckboxFilter: (state, action: PayloadAction<{topic: string, value: string, displayName: string}>) => {
			// verifica se o tópico (ex: subject, year) já existe na lista
			const existentTopic =
				state.selectedFilters.find(
					(filter) => filter.topic === action.payload.topic
				)

			// caso exista, irá manipulá-lo
			if(existentTopic) {
				// caso o valor da checkbox exista na lista do tópico
				if(existentTopic.values.includes(action.payload.value)) {
					state.selectedFilters = state.selectedFilters.map((filter) => {
						// verifica se o tópico é o mesmo
						if(filter.topic === action.payload.topic) {
							// e remove o valor selecionado da lista
							return {
								topic: action.payload.topic,
								values: filter.values.filter((value) => value !== action.payload.value),
								displayName: action.payload.displayName
							}
						}
						// retorna o valor anterior caso não seja o escolhido
						return filter
					})
				} else { // caso o valor da checkbox não exista na lista do tópico
					state.selectedFilters = state.selectedFilters.map((filter) => {
						// verifica se é o mesmo tópico
						if(filter.topic === action.payload.topic) {
							// adiciona o valor na lista
							return {
								topic: action.payload.topic,
								values: [...filter.values, action.payload.value],
								displayName: action.payload.displayName
							}
						}
						// retorna o valor anterior caso não seja o escolhido
						return filter
					})
				}
			} else { // caso não, irá adicionar o novo tópico na lista
				state.selectedFilters =
					[
						...state.selectedFilters,
						// tópico e o valor selecionado (valor da checkbox)
						{
							topic: action.payload.topic,
							values: [action.payload.value],
							displayName: action.payload.displayName
						}
					]
			}
		},

		setLimit: (state, action: PayloadAction<number>) => {
			state.previousLimit = state.limit
			state.limit = action.payload
		}
	}
})

export default filtersSlice.reducer

export const { toggleCheckboxFilter, setLimit } = filtersSlice.actions

export const selectSelectedFilters = (state: RootState) => state.filters.selectedFilters
export const selectLimit = (state: RootState) => state.filters.limit
export const selectPreviousLimit = (state: RootState) => state.filters.previousLimit
