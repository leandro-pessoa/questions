import { useEffect, useRef, useState } from 'react'
import { StyledDiv } from './styles'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Input from '../../Input'
import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { Loading } from '../../Loading'
import Checkbox from '../../Checkbox'

interface IFiltersSelectProps {
	topicFetchUrl: string
	title: string
	type?: 'checkbox' | 'default'
}

const FiltersSelect = ({ topicFetchUrl, title, type = 'default' }: IFiltersSelectProps) => {
	const [activated, setActivated] = useState<boolean>(false)
	const [fetchedSelectContent, setFetchedSelectContent] = useState<string[]>([])
	const [actualSelectContent, setActualSelectContent] = useState<string[]>(fetchedSelectContent)
	const [searchInputValue, setSearchInputValue] = useState<string>('')
	const [selectedTopics, setSelectedTopics] = useState<string | string[]>('')

	const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
		// fecha o dropdown ao clicar fora dele
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (ref.current && !ref.current.contains(target)) {
                setActivated(false)
            }
        }
        document.addEventListener('click', handleClickOutside, true)

		// fetch e preenchimento do conteúdo que pode ser selecionado
		const fetchContent = async () => {
			try {
				const res = await http.get<string[]>(`/column?selectedColumn=${topicFetchUrl}`)
				setFetchedSelectContent(res.data)
				setActualSelectContent(res.data)
			} catch(err) {
				axiosError(err)
			}
		}

		// somente executa o fetch caso não tenha sido executado antes
		if (activated === true && fetchedSelectContent.length === 0) {
			fetchContent()
		}
    }, [activated, setActivated, fetchedSelectContent, topicFetchUrl])

	useEffect(() => {
		// altera o state que exibe os tópicos conforme o searchInputValue
		const handleActualSelectContent = () => {
			if(!searchInputValue) { // caso esteja vazio, exibe todos os elementos retornados pelo fetch
				setActualSelectContent(fetchedSelectContent)
			} else { // caso seja preenchido, irá setar o state os tópicos que passem no teste de regexp
				setActualSelectContent(
					fetchedSelectContent.filter(
						(topic) => new RegExp(searchInputValue, 'i').test(topic)
					)
				)
			}
		}
		// executa a função caso o searchInputValue seja alterado
		handleActualSelectContent()
	}, [searchInputValue, fetchedSelectContent])

	// renderiza a lista de tópicos selecionáveis
	const renderSelectableElements = () => {
		// renderiza o loading caso o fetch ainda esteja sendo realizado
		if(fetchedSelectContent.length === 0) {
			return <Loading $borderSize='2px' $size='20px'><div></div></Loading>
		} else if (fetchedSelectContent.length > 0 && actualSelectContent.length === 0) { // renderiza uma mensagem caso nenhum valor tenha sido encontrado na pesquisa
			return <p style={{ textAlign: 'center', padding: '8px 0'}}>Nenhum valor foi encontrado</p>
		} else { // senão, renderiza os valores
			return (
				<ul className='expand-box__topics-list'>
					{
						actualSelectContent.map((value) =>
							<li key={value}>
								{
									// troca o tipo de tópico selecionável, de acordo com a prop type
									type === 'default' ?
										<button onClick={() => setSelectedTopics(value)}>
											{value}
										</button>
									:
										<Checkbox
											label={value}
											value={value}
											topic={topicFetchUrl}
										/>
								}
							</li>
						)
					}
				</ul>
			)
		}
	}

	return (
		<StyledDiv $expandBoxDisplay={activated} ref={ref}>
			<button className='select__button' onClick={() => setActivated(!activated)}>
				{
					// muda a legenda caso um tópico seja selecionado no modo default
					type === 'default' ?
						selectedTopics || title
					:
						title
				}
				{
					// ícones de acordo com o select aberto ou não
					activated ?
						<ChevronUp />
					:
						<ChevronDown />
				}
			</button>
			<div className='select__expand-box'>
				<Input
					placeholder='Pesquisar'
					style={{height: 'max-content'}}
					onChange={(e) => setSearchInputValue(e.target.value)}
					value={searchInputValue}
				/>
				{renderSelectableElements()}
			</div>
		</StyledDiv>
	)
}

export default FiltersSelect
