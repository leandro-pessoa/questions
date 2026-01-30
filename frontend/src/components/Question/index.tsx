import { selectToken, selectUser } from '@/app/reducers/user'
import { useState } from 'react'
import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { useAppSelector } from '@/app/hooks'

import { StyledLi } from './styles'
import Button from '../Button'
import Option from './Option'
import QuestionFeedback from './QuestionFeedback'

import type { IAlternative } from '@/types/IAlternative'
import type { IQuestion } from '@/types/IQuestion'

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

	// atualiza o user logado com a questão e opção selecinada
	const answerQuestion = async () => {
		// caso não haja user, não faça nada
		if (!user) return

		try {
			// faz a requisição put com o id da questão respondida, opção selecionada
			// e o token do user logado
			await http
				.put(
					'/users/answerQuestion',
					{
						questionId: _id,
						selectedOption: selectedOption,
					},
					{ headers: { Authorization: token && `Bearer ${token}` } },
				)
				.then(() => setIsAnswered(true)) // atualiza o state, atualizando a interface
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
				{/* alternativas da questão */}
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
			{/*
				verifica três fatores para o button aparecer:
				- se há opção selecionada
				- se há user logado
				- se já foi respondida
			*/}
			{selectedOption !== null && user && !isAnswered && (
				<Button style={{ marginTop: '16px' }} onClick={answerQuestion}>
					Responder
				</Button>
			)}
			{/* verifica se já foi respondida */}
			{isAnswered &&
				(selectedOption?.right ? ( // verifica se a opção selecinada foi a correta, retornando o elemento correspondente
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
