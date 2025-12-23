import { StyledLi } from './styles'
import type { IQuestion } from '@/types/IQuestion'
import { Small } from '../Small'
import Button from '../Button'
import Option from './Option'
import { useState } from 'react'

// subject
// statement
// year?
// instituition?
// position?
// examiningBoard?
// wrongAlternatives
// rightAlternative

interface IQuestionProps {
	randomAlternatives: string[] | number[]
}

const Question = ({
	subject,
	statement,
	year,
	instituition = '',
	position = '',
	examiningBoard = '',
	randomAlternatives
}: IQuestion & IQuestionProps) => {
	const [selectedOption, setSelectedOption] = useState<number | null>(null)

	const multipleAlternatives = ['A', 'B', 'C', 'D', 'E']
	const twoAlternatives = ['C', 'E']

	return (
		<StyledLi>
			<Small>{subject}</Small>
			<Small>{instituition}</Small>
			<Small>{position}</Small>
			<Small>
				({examiningBoard} -{' '}
				<Small style={{ display: 'inline' }}>{year}</Small>)
			</Small>
			<span>{statement}</span>
			<ol className='alternatives'>
				{randomAlternatives.map((alternative, index) => {
					return (
						<Option
							alternative={alternative}
							index={index}
							multipleAlternatives={multipleAlternatives}
							randomAlternatives={randomAlternatives}
							twoAlternatives={twoAlternatives}
							selected={selectedOption === index}
							setSelected={() => setSelectedOption(index)}
							key={alternative}
						/>
					)
				})}
			</ol>
			<Button style={{ marginTop: '16px' }}>Responder</Button>
		</StyledLi>
	)
}

export default Question
