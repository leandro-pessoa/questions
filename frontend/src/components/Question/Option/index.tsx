import Button from '@/components/Button'
import { ScissorsLineDashed } from 'lucide-react'
import { StyledButton } from './styles'
import { useState } from 'react'

interface IOptionProps {
	alternative: string | number
	randomAlternatives: string[] | number[]
	index: number
	twoAlternatives: string[]
	multipleAlternatives: string[]
	selected: boolean
	setSelected: () => void
}

const Option = ({
	alternative,
	randomAlternatives,
	index,
	twoAlternatives,
	multipleAlternatives,
	selected,
	setSelected
}: IOptionProps) => {
	const [cutted, setCutted] = useState<boolean>(false)

	return (
		<StyledButton $cutted={cutted} $selected={selected} onClick={setSelected}>
			<Button
				iconButton
				className='option__cut'
				onClick={() => setCutted(!cutted)}
			>
				<ScissorsLineDashed />
			</Button>
			<span className='option__letter'>
				{randomAlternatives.length < 3
					? twoAlternatives[index]
					: multipleAlternatives[index]}
			</span>
			{alternative}
		</StyledButton>
	)
}

export default Option
