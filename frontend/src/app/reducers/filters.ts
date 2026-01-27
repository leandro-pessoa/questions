import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface IFilters {
	selectedFilters: {topic: string, values: string[]}[]
}

const initialState: IFilters = {
	selectedFilters: []
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		// irá adicionar objetos ou remover valores da lista do objeto adicionado com um clique
		toggleCheckboxFilter: (state, action: PayloadAction<{topic: string, value: string}>) => {
			// verifica se o tópico (ex: subject, year) já existe na lista
			const existentTopic =
				state.selectedFilters.find(
					filter => filter.topic === action.payload.topic
				)

			// caso exista, irá manipulá-lo
			if(existentTopic) {
				// caso o valor da checkbox exista na lista do tópico
				if(existentTopic.values.includes(action.payload.value)) {
					state.selectedFilters = state.selectedFilters.map(filter => {
						// verifica se o tópico é o mesmo
						if(filter.topic === action.payload.topic) {
							// e remove o valor selecionado da lista
							return {
								topic: action.payload.topic,
								values: filter.values.filter(value => value !== action.payload.value)
							}
						}
						// retorna o valor anterior caso não seja o escolhido
						return filter
					})
				} else { // caso o valor da checkbox não exista na lista do tópico
					state.selectedFilters = state.selectedFilters.map(filter => {
						// verifica se é o mesmo tópico
						if(filter.topic === action.payload.topic) {
							// adiciona o valor na lista
							return {
								topic: action.payload.topic,
								values: [...filter.values, action.payload.value]
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
						{topic: action.payload.topic, values: [action.payload.value]}
					]
			}
		}
	}
})

export default filtersSlice.reducer

export const { toggleCheckboxFilter } = filtersSlice.actions

export const selectSelectedFilters = (state: RootState) => state.filters.selectedFilters
