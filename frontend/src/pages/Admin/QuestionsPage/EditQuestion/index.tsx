import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectModalType, setModalType } from '@/app/reducers/modal'
import { fetchQuestions } from '@/app/reducers/question'
import { selectToken } from '@/app/reducers/user'
import { toast } from 'react-toastify'
import { http } from '@/http'
import { axiosError } from '@/utils/axiosError'
import { setIsLoading } from '@/app/reducers/loading'

import Button from '@/components/Button'
import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'
import Textarea from '@/components/Textarea'
import { StyledUl } from './styles'
import { X } from 'lucide-react'
import Modal from '@/components/Modal'

import type { IQuestion } from '@/types/IQuestion'
import type { FieldValues } from 'react-hook-form'

const EditQuestion = (question: IQuestion) => {
	const dispatch = useAppDispatch()

	const token = useAppSelector(selectToken)
	const modalType = useAppSelector(selectModalType)

	const submitHandle = async (data: FieldValues) => {
		console.log(data)
		try {
			dispatch(setIsLoading(true))
			// irá realizar a requisição de alteração de questão
			// necessita do token de admin
			await http.put(
				`/questions/${question._id}`,
				{ ...data },
				{ headers: { Authorization: token && `Bearer ${token}`}})
			.then(() => {
				// refresh das questions, feedback e fecha o modal
				dispatch(fetchQuestions())
				toast.success(`Questão ${question._id} atualizada com sucesso`)
				dispatch(setModalType(''))
			})
		} catch (err) {
			axiosError(err)
		}
		dispatch(setIsLoading(false))
	}

	// ano completo atual para limitar o input do ano
	const fullYear = new Date().getFullYear()

	return modalType === 'editQuestion' ? (
		<Modal title='Editar questão'>
			<Form onSubmit={submitHandle} grid>
				<InputContainer>
					<label htmlFor='subject'>Disciplina</label>
					<FormInput
						required
						id='subject'
						name='Disciplina'
						minLength={2}
						maxLength={20}
						value={question.subject}
					/>
				</InputContainer>
				<InputContainer style={{ gridColumn: '1 / 3' }}>
					<label htmlFor='statement'>Enunciado</label>
					<Textarea
						required
						id='statement'
						name='Enunciado'
						minLength={10}
						maxLength={500}
						value={question.statement}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='year'>Ano</label>
					<FormInput
						required
						id='year'
						name='Ano'
						type='number'
						max={fullYear}
						min={1900}
						value={question.year}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='instituition'>Organização</label>
					<FormInput
						required
						id='instituition'
						name='Organização'
						minLength={2}
						maxLength={30}
						value={question.instituition}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='position'>Cargo</label>
					<FormInput
						required
						id='position'
						name='Cargo'
						minLength={4}
						maxLength={30}
						value={question.position}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='examiningBoard'>Banca examinadora</label>
					<FormInput
						required
						id='examiningBoard'
						name='Banca examinadora'
						minLength={2}
						maxLength={30}
						value={question.examiningBoard}
					/>
				</InputContainer>
				<div style={{ gridColumn: '1 / 3' }}>
					<label htmlFor='alternatives'>Alternativas</label>
					<StyledUl id='alternatives'>
						{question.alternatives.map((alternative) => {
							return (
								<li key={alternative._id}>
									<InputContainer style={{ flexDirection: 'row' }}>
										<div className='alternative__letter-container'>
											<FormInput
												required
												id={alternative.letter}
												name='Alternativa'
												value={alternative.letter}
												style={{ textAlign: 'center' }}
												pattern={/^[A|B|C|D|E]{1}$/g}
											/>
										</div>
										<div className='alternative__text-container'>
											<FormInput
												required
												id={alternative.text}
												name='Assertiva'
												value={alternative.text}
												minLength={1}
												maxLength={100}
											/>
										</div>
									</InputContainer>
									<Button
										iconButton
										title='Remover'
										style={{
											padding: '0',
											alignSelf: 'center',
										}}
									>
										<X />
									</Button>
								</li>
							)
						})}
					</StyledUl>
				</div>
				<Button type='submit'>Atualizar</Button>
				<Button onClick={() => dispatch(setModalType(''))}>
					Cancelar
				</Button>
			</Form>
		</Modal>
	) : (
		<></>
	)
}

export default EditQuestion
