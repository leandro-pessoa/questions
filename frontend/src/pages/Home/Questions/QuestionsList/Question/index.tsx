import { selectUser } from '@/app/reducers/user'
import { useState } from 'react'
import { useAppSelector } from '@/app/hooks'
import { useFetch } from '@/app/hooks/useFetch'

import { StyledLi } from './styles'
import Option from './Option'
import QuestionFeedback from './QuestionFeedback'
import { Loading } from '@/components/Loading'

import Button from '@/components/Button'

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
	const [selectedOption, setSelectedOption] = useState<IAlternative | null>(
		null,
	)
	const [isAnswered, setIsAnswered] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// realiza o update do user com a questão atual respondida
	const { fetchHandle } = useFetch()

	return (
		<StyledLi>
			<div className='question__header'>
				<span className='header__number'>{index}</span>
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
				{alternatives.map((alternative) => (
					<Option
						alternative={alternative}
						selected={selectedOption === alternative}
						setSelected={(option) => setSelectedOption(option)}
						key={alternative._id}
						isAnswered={isAnswered}
					/>
				))}
			</ol>
			{/*
				verifica três fatores para o button aparecer:
				- se há opção selecionada
				- se há user logado
				- se já foi respondida
			*/}
			{selectedOption !== null && user && !isAnswered && (
				// atualiza o user logado com a questão e opção selecinada
				<Button
					onClick={() =>
						fetchHandle({
							url: '/users/answerQuestion',
							data: {
								questionId: _id,
								selectedOption: selectedOption,
							},
							httpMethod: 'put',
							then: () => setIsAnswered(true), // atualiza o state local da questão, dando o feedback de respondida
							localLoadingFunc: setIsLoading, // atualiza o state local de loading
						})
					}
				>
					{
						// exibe o loading ao responder uma questão
						isLoading && (
							<Loading
								$overlay={false}
								$size='15px'
								$borderSize='2px'
							>
								<div></div>
							</Loading>
						)
					}
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
