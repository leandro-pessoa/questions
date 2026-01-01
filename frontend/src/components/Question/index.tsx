import { StyledLi } from './styles'
import type { IQuestion } from '@/types/IQuestion'
import Button from '../Button'
import Option from './Option'
import { useState } from 'react'
import { http } from '@/http'
import type { IAlternative } from '@/types/IAlternative'
import { axiosError } from '@/utils/axiosError'
import { useAppSelector } from '@/app/hooks'
import { selectToken, selectUser } from '@/app/reducers/user'
import QuestionFeedback from './QuestionFeedback'

interface IQuestionProps {
	index: number
}

const Question = ({
	_id,
	subject,
	statement,
	year,
	instituition = '',
	position = '',
	examiningBoard = '',
	alternatives,
	index,
}: IQuestion & IQuestionProps) => {
	const user = useAppSelector(selectUser)
	const token = useAppSelector(selectToken)
	const [selectedOption, setSelectedOption] = useState<IAlternative | null>(
		null,
	)
	const [isAnswered, setIsAnswered] = useState<boolean>(false)

	const answerQuestion = async () => {
		if (!user) return

		try {
			await http
				.put(
					'/users/answerQuestion',
					{
						questionId: _id,
						selectedOption: selectedOption,
					},
					{ headers: { Authorization: token && `Bearer ${token}` } },
				)
				.then(() => setIsAnswered(true))
		} catch (err) {
			axiosError(err)
		}
	}

	return (
		<StyledLi>
			<div className='question__header'>
				<span className='header__number'>{index + 1}</span>
				<span className='header__subject header__element'>
					{subject}
				</span>
				<span className='header__element'>
					({examiningBoard} -{' '}
					<p style={{ display: 'inline' }}>{year}</p>)
				</span>
				<span className='header__element'>{instituition}</span>
				<span className='header__element'>{position}</span>
			</div>
			<p className='question__statement'>{statement}</p>
			<ol className='question__alternatives'>
				{alternatives.map((alternative) => {
					return (
						<Option
							alternative={alternative}
							selected={selectedOption === alternative}
							setSelected={(option) => setSelectedOption(option)}
							key={alternative._id}
							isAnswered={isAnswered}
						/>
					)
				})}
			</ol>
			{selectedOption !== null && user && !isAnswered && (
				<Button style={{ marginTop: '16px' }} onClick={answerQuestion}>
					Responder
				</Button>
			)}
			{isAnswered &&
				(selectedOption?.right ? (
					<QuestionFeedback correct={true}>
						Resposta correta!
					</QuestionFeedback>
				) : (
					<QuestionFeedback correct={false}>
						Resposta incorreta
					</QuestionFeedback>
				))}
		</StyledLi>
	)
}

export default Question
