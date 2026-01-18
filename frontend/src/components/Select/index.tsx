import { useEffect, useRef, useState } from 'react'
import { StyledDiv } from './styles'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Input from '../Input'
import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { Loading } from '../Loading'
import Checkbox from '../Checkbox'

interface ISelectProps {
	topicFetchUrl: string
	title: string
	type?: 'checkbox' | 'default'
}

const Select = ({ topicFetchUrl, title, type = 'default' }: ISelectProps) => {
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
				{
					fetchedSelectContent.length === 0 ?
						<Loading $borderSize='2px' $size='20px'><div></div></Loading>
					:
					<ul className='expand-box__topics-list'>
						{
							actualSelectContent.map((topic) =>
								<li key={topic}>
									{
										type === 'default' ?
											<button onClick={() => setSelectedTopics(topic)}>
												{topic}
											</button>
										:
											<Checkbox
												label={topic}
												value={topic}
												topics={selectedTopics as string[]}
												setSelectedTopics={setSelectedTopics}
											/>
									}
								</li>
							)
						}
					</ul>
				}
			</div>
		</StyledDiv>
	)
}

export default Select
