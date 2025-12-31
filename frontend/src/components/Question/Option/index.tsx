import Button from '@/components/Button'
import { ScissorsLineDashed } from 'lucide-react'
import { StyledLi } from './styles'
import { useState } from 'react'
import type { IAlternative } from '@/types/IAlternative'

interface IOptionProps {
	alternative: IAlternative
	selected: boolean
	setSelected: (option: number | null) => void
	index: number
}

const Option = ({
	alternative,
	selected,
	setSelected,
	index
}: IOptionProps) => {
	const [cutted, setCutted] = useState<boolean>(false)

	const selectHandle = () => {
		if (cutted) {
			setCutted(false)
		}
		setSelected(index)
	}

	const cutHandle = () => {
		if (selected) {
			setSelected(null)
			setCutted(true)
		} else {
			setCutted(!cutted)
		}
	}

	return (
		<>
			<StyledLi $cutted={cutted} $selected={cutted ? false : selected}>
				<Button
					iconButton
					className='option__cut'
					onClick={cutHandle}
				>
					<ScissorsLineDashed />
				</Button>
				<button onClick={selectHandle} className='option__select'>
					<span className='select__letter'>
						<span>{alternative.letter}</span>
					</span>
					<p className='select__text'>{alternative.text}</p>
				</button>
			</StyledLi>
		</>

	)
}

export default Option
