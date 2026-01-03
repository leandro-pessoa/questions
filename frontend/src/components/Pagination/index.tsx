import { useAppDispatch } from '@/app/hooks'
import { useEffect, useState } from 'react'

import { StyledUl } from './styles'
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react'
import Button from '../Button'

import type { AsyncThunkAction, AsyncThunkConfig, AsyncThunkDispatchConfig } from '@reduxjs/toolkit'
import { vars } from '@/styles/vars'

interface IPaginationProps {
	totalPages: number
	limit: number
	fetchFunc(arg?: {
		page?: number;
		limit?: number;
	} | undefined, config?: AsyncThunkDispatchConfig): AsyncThunkAction<{
		pageResult: object[];
		totalPages: number;
	}, {
		page?: number;
		limit?: number;
	} | undefined, AsyncThunkConfig>
}

const Pagination = ({ totalPages, limit, fetchFunc }: IPaginationProps) => {
	const dispatch = useAppDispatch()
	const [actualPage, setActualPage] = useState<number>(1)

	// move o scroll para o início da página ao trocar de página
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [actualPage])

	// troca a página para a informada no parâmetro, fazendo o fetch e setando o state local
	const changePage = (page: number) => {
		// caso a página selecionada for a atual, não faz nada
		if (page === actualPage) return
		dispatch(fetchFunc({ page, limit }))
		setActualPage(page)
	}

	// função para avançar ou retroceder a alguma página, a partir da atual
	// next para próxima e prev para a anterior
	const nextOrPrevPage = (method: 'next' | 'prev') => {
		if (method === 'next') {
			// caso seja a última
			if (actualPage === totalPages) return
			changePage(actualPage + 1)
		} else {
			if (actualPage === 1) return
			changePage(actualPage - 1)
		}
	}

	// irá renderizar os números selecionáveis das páginas
	const renderPages = () => {
		// array que conterá os números
		let numbersArray = []

		// cada página do total será inserida no array
		for(let i = 1; i <= totalPages; i++) {
			numbersArray.push(i)
		}

		// condições para mostrar um limite de 5 números de páginas na paginação
		// mostra a página 1 e 4 a frente
		if (actualPage === 1) {
			numbersArray = numbersArray.slice(0, actualPage + 4)
		} else if (actualPage === 2) { // mostra a página 1, 2 e três a frente
			numbersArray = numbersArray.slice(0, actualPage + 3)
		} else { // mostra a página atual ao meio e mais duas na frente e atrás
			numbersArray = numbersArray.slice(actualPage - 3, actualPage + 2)
		}

		// retorna cada número selecionável de acordo com o numbersArray
		return numbersArray.map((value) =>
			<li
				key={value}
				style={
					value === actualPage ? {borderBottom: `2px solid ${vars.colors.blue}`} : {}
				}
			>
				<Button onClick={() => changePage(value)} iconButton>{value}</Button>
			</li>
		)
	}

	return (
		<StyledUl>
			{
				// button para voltar para a primeira página, caso o número selecionável não esteja visível
				actualPage >= 4 &&
					<li>
						<Button onClick={() => changePage(1)} iconButton><ChevronsLeft /></Button>
					</li>
			}
			{
				// button para voltar uma página, caso não esteja na primeira
				actualPage > 1 &&
					<li>
						<Button onClick={() => nextOrPrevPage('prev')} iconButton><ChevronLeft /></Button>
					</li>
			}
			{/* renderização dos números das páginas */}
			{renderPages()}
			{
				// button para avançar uma página, caso não esteja na última
				actualPage < totalPages &&
					<li>
						<Button onClick={() => nextOrPrevPage('next')} iconButton><ChevronRight /></Button>
					</li>
			}
			{
				// button para avançar para a última página, caso não esteja visível nos números
				actualPage < totalPages - 2 &&
					<li>
						<Button onClick={() => changePage(totalPages)} iconButton><ChevronsRight /></Button>
					</li>
			}
		</StyledUl>
	)
}

export default Pagination
