import { useState } from 'react'

import Button from '@/components/Button'
import { ScissorsLineDashed } from 'lucide-react'
import { StyledLi } from './styles'

import type { IAlternative } from '@/types/IAlternative'

interface IOptionProps {
	alternative: IAlternative
	selected: boolean
	setSelected: (option: IAlternative | null) => void
	isAnswered: boolean
}

const Option = ({
	alternative,
	selected,
	setSelected,
	isAnswered
}: IOptionProps) => {
	const [cutDisplay, setCutDisplay] = useState<boolean>(false)
	const [cutted, setCutted] = useState<boolean>(false)

	// seleciona uma opção, caso a questão não tenha sido respondida
	const selectHandle = () => {
		if (!isAnswered) {
			if (cutted) {
				setCutted(false)
			}
			setSelected(alternative)
		}
	}

	// elimina uma opção, caso a questão não tenha sido respondida
	const cutHandle = () => {
		if (!isAnswered) {
			if (selected) {
				setSelected(null)
				setCutted(true)
			} else {
				setCutted(!cutted)
			}
		}
	}

	return (
		<StyledLi
			$cutted={cutted}
			$selected={cutted ? false : selected}
			$isAnswered={isAnswered}
			onMouseEnter={() => setCutDisplay(true)}
		>
			{
				// só irá existir após o primeiro hover, para não carregar juntamente com a questão
				// melhora a performance
				cutDisplay &&
					<Button
						iconButton
						className='option__cut'
						onClick={cutHandle}
					>
						<ScissorsLineDashed />
					</Button>
			}
			<button onClick={selectHandle} className='option__select'>
				<span className='select__letter'>
					<span>{alternative.letter}</span>
				</span>
				<p className='select__text'>{alternative.text}</p>
			</button>
		</StyledLi>
	)
}

export default Option
