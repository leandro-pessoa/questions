import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { clearModal, selectModalType } from '@/app/reducers/modal'
import { useFetch } from '@/app/hooks/useFetch'
import { vars } from '@/styles/vars'
import { useState } from 'react'

import Button from '@/components/Button'
import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'
import Textarea from '@/components/Textarea'
import { StyledDiv, StyledUl } from './styles'
import { X } from 'lucide-react'
import Modal from '@/components/Modal'
import Checkbox from '@/components/Checkbox'

import type { IQuestion } from '@/types/IQuestion'
import type { FieldValues } from 'react-hook-form'

const EditQuestion = (question: IQuestion) => {
	const dispatch = useAppDispatch()

	const modalType = useAppSelector(selectModalType)
	const [checked, setChecked] = useState<string>('')

	const { fetchHandle } = useFetch()

	const submitHandle = async (data: FieldValues) => {
		// irá realizar a requisição de alteração de questão
		// necessita do token de admin
		// fetchHandle({
		// 	isModal: true,
		// 	httpMethod: 'put',
		// 	url: `/questions/${question._id}`,
		// 	refreshFunc: fetchQuestions,
		// 	feedbackText: `Questão ${question._id} atualizada com sucesso`,
		// 	data: { ...data } as IQuestion,
		// 	globalLoading: true
		// })

		console.log(data)
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
									<InputContainer
										style={{ flexDirection: 'row' }}
									>
										<div className='alternative__letter-container'>
											<FormInput
												required
												id={alternative.letter}
												name='Alternativa'
												value={alternative.letter}
												style={{
													textAlign: 'center',
													padding: '6px',
												}}
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
									<div className='alternavite__options'>
										<Checkbox
											label='Correta'
											checked={
												alternative._id === checked
											}
											checkHandle={() =>
												setChecked(alternative._id)
											}
										/>
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
									</div>
								</li>
							)
						})}
					</StyledUl>
				</div>
				<StyledDiv>
					<Button
						type='submit'
						backgroundColor={vars.colors.yellow}
						style={{ color: vars.colors.black }}
					>
						Atualizar
					</Button>
					<Button onClick={() => dispatch(clearModal())}>
						Cancelar
					</Button>
				</StyledDiv>
			</Form>
		</Modal>
	) : (
		<></>
	)
}

export default EditQuestion
