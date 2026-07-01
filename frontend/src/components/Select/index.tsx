import { useEffect, useRef, useState, type CSSProperties } from 'react'

import { StyledDiv } from './styles'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ISelectProps {
	style?: CSSProperties
	className?: string
	options: string[]
	id?: string
	selectedOption: string
	setSelectedOption: (opt: string) => void
}

const Select = ({ style, className, options, id, selectedOption, setSelectedOption }: ISelectProps) => {
	const [activated, setActivated] = useState<boolean>(false)

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
	}, [])

	const selectHandle = (opt: string) => {
		setSelectedOption(opt)
		setActivated(false)
	}

	return (
		<StyledDiv
			$expandBoxDisplay={activated}
			ref={ref}
			style={style}
			className={className}
			id={id}
		>
			<button
				className='select__button'
				type='button'
				onClick={() => setActivated(!activated)}
			>
				{selectedOption ? selectedOption : 'Selecionar'}
				{
					// ícones de acordo com o select aberto ou não
					activated ? <ChevronUp /> : <ChevronDown />
				}
			</button>
			<div className='select__expand-box'>
				<ul className='expand-box__topics-list'>
					{/* itera sobre o array options, exibindo todas as opções para selecionar */}
					{options.map((opt) => (
						<li key={opt}>
							<button onClick={() => selectHandle(opt)} type='button'>
								{opt}
							</button>
						</li>
					))}
				</ul>
			</div>
		</StyledDiv>
	)
}

export default Select
