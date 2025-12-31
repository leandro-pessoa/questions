import { StyledLi } from './styles'
import type { IQuestion } from '@/types/IQuestion'
import Button from '../Button'
import Option from './Option'
import { useState } from 'react'

interface IQuestionProps {
	index: number
}

const Question = ({
	subject,
	statement,
	year,
	instituition = '',
	position = '',
	examiningBoard = '',
	alternatives,
	index
}: IQuestion & IQuestionProps) => {
	const [selectedOption, setSelectedOption] = useState<number | null>(null)

	return (
		<StyledLi>
			<p className='question__header'>
				<span className='header__number'>{index + 1}</span>
				<span className='header__subject header__element'>{subject}</span>
				<span className='header__element'>
					({examiningBoard} -{' '}
					<p style={{ display: 'inline' }}>{year}</p>)
				</span>
				<span className='header__element'>{instituition}</span>
				<span className='header__element'>{position}</span>
			</p>
			<p className='question__statement'>{statement}</p>
			<ol className='question__alternatives'>
				{alternatives.map((alternative, index) => {
					return (
						<Option
							alternative={alternative}
							selected={selectedOption === index}
							setSelected={(option) => setSelectedOption(option)}
							key={alternative._id}
							index={index}
						/>
					)
				})}
			</ol>
			{
				selectedOption !== null &&
					<Button style={{ marginTop: '16px' }}>Responder</Button>
			}
		</StyledLi>
	)
}

export default Question
