import { useFetch } from '@/app/hooks/useFetch'
import { useEffect, useState, type ChangeEvent } from 'react'
import { ObjectId } from 'bson'
import { toast } from 'react-toastify'
import { fetchQuestions } from '@/app/reducers/question'

import Button from '@/components/Button'
import Form from '@/components/Form'
import FormInput from '@/components/Input/FormInput'
import InputContainer from '@/components/Input/InputContainer'
import Textarea from '@/components/Textarea'
import { AlternativesDiv } from './styles'
import { Plus, X } from 'lucide-react'
import Modal from '@/components/Modal'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import ModalButtonsDiv from '@/components/ModalButtonsDiv'

import type { IQuestion } from '@/types/IQuestion'
import type { FieldValues } from 'react-hook-form'
import type { IAlternative } from '@/types/IAlternative'

const QuestionForm = ({question, mode}: {question?: IQuestion, mode: 'put' | 'post'}) => {
	const [checked, setChecked] = useState<string>('')
	const [alternatives, setAlternatives] = useState<IQuestion['alternatives']>(
		question?.alternatives || [],
	)

	const { fetchHandle } = useFetch()

	// atribui as alternativas da questão a ser editada no state alternatives
	useEffect(() => {
		if (question) { // caso seja para adição, não executa este bloco
			const updateAlternatives = () => {
				setAlternatives(question.alternatives)

				// faz uma verificação para não retornar um erro
				// registra no checked a alternativa que está correta no banco
				if (question.alternatives) {
					const rightAnswer = question.alternatives.find((alternative) => alternative.right)
					if (rightAnswer) setChecked(rightAnswer._id)
				}
			}
			updateAlternatives()
		}
	}, [question?.alternatives, question])

	// altera um atributo de um objeto que está dentro do array de alternativas
	// é utilizado nos inputs das alternativas
	// parâmetros:
	// evento, id da alternativa e atributo a ser modificado, isCheckbox para alterar a alternativa correta
	const setAlternative = (
		e: ChangeEvent<HTMLInputElement>,
		alternativeId: IAlternative['_id'],
		attribute: string,
		isCheckbox: boolean = false
	) => {
		setAlternatives(alternatives.map((alt) => {
			if (alt._id === alternativeId) { // encontra o objeto a ser modificado
				return {
					...alt,
					[attribute]: isCheckbox ? true : e.target.value
				} // altera o valor do atributo
			}
			return {...alt, right: isCheckbox ? false : alt.right} //retorna o objeto inalterado caso não seja o alvo da modificação
		}))
	}

	const submitHandle = async (data: FieldValues) => {
		// verifica se a quantidade mínima de alternativas foi enviada
		if(alternatives.length < 2) {
			toast.error('Adicione ao menos duas alternativas')
			return
		}

		// verifica se alguma opção for marcada como correta
		// caso não, retorna um feedback e finaliza a função
		if (!checked) {
			toast.error('Marque uma alternativa correta')
			return
		}

		// chaves do objeto enviado pelo formulário
		const questionKeys = Object.keys(data)

		// irá remover os atributos dos formulários das alternativas
		// pois as alternativas estão salvas no state alternatives
		questionKeys.forEach((key) => {
			if(key.match(/^[a-fA-F0-9]{24,25}$/)) {
				delete data[key]
			}
		})

		// questão limpa com os demais dados e alternativas
		const newQuestion = { ...data, alternatives: [...alternatives] }

		// irá realizar a requisição de alteração/adição de questão
		// necessita do token de admin
		fetchHandle({
			isModal: true,
			httpMethod: mode,
			url: `/questions${question ? `/${question._id}` : ''}`,
			refreshFunc: fetchQuestions,
			feedbackText:
				question ?
				`Questão ${question._id} atualizada com sucesso`
				:
				'Questão adicionada com sucesso',
			data: newQuestion as IQuestion,
			globalLoading: true
		})
	}

	// ano completo atual para limitar o input do ano
	const fullYear = new Date().getFullYear()

	// remove uma alternativa da lista
	const removeAlternative = (id: IAlternative['_id']) => {
		const filteredAlternatives = alternatives.filter(
			(alternative) => {
				// caso seja a alternativa correta, limpa o state checked
				if(alternative.right && alternative._id === id) setChecked('')

				// retorna a alternativa que não seja a que for ser excluída
				return alternative._id !== id
			},
		)
		setAlternatives(filteredAlternatives)
	}

	// adiciona uma nova alternativa na lista
	const addAlternative = () => {
		// id no mesmo formado do mongodb
		const id = new ObjectId().toString()

		// adiciona nova alternativa
		setAlternatives([
			...alternatives,
			{ right: false, text: 'Nova alternativa', letter: 'A', _id: id }
		])
	}

	// handle para a função da checkbox
	// altera o valor correto nas alternativas e muda o state de visualização das checkboxes
	const checkHandle = (
		e: ChangeEvent<HTMLInputElement>,
		alternativeId: IAlternative['_id']
	) => {
		setAlternative(e, alternativeId, 'right', true)
		setChecked(alternativeId)
	}

	return (
		<Modal title={mode === 'put' ? 'Editar questão' : 'Adicionar questão'}>
			<Form onSubmit={submitHandle} grid>
				<InputContainer>
					<label htmlFor='subject'>Disciplina</label>
					<FormInput
						required
						id='subject'
						name='Disciplina'
						minLength={2}
						maxLength={40}
						value={question ? question.subject : ''}
					/>
				</InputContainer>
				<InputContainer style={{ gridColumn: '1 / 3' }}>
					<label htmlFor='statement'>Enunciado</label>
					<Textarea
						required
						id='statement'
						name='Enunciado'
						minLength={10}
						maxLength={1000}
						value={question ? question.statement : ''}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='year'>Ano</label>
					<FormInput
						required
						id='year'
						name='Ano'
						type='number'
						min={1900}
						max={fullYear}
						value={question ? question.year : ''}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='instituition'>Organização</label>
					<FormInput
						required
						id='instituition'
						name='Organização'
						minLength={2}
						maxLength={40}
						value={question ? question.instituition : ''}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='position'>Cargo</label>
					<FormInput
						required
						id='position'
						name='Cargo'
						minLength={4}
						maxLength={40}
						value={question ? question.position : ''}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='examiningBoard'>Banca examinadora</label>
					<FormInput
						required
						id='examiningBoard'
						name='Banca examinadora'
						minLength={2}
						maxLength={40}
						value={question ? question.examiningBoard : ''}
					/>
				</InputContainer>
				<AlternativesDiv>
					{/* verifica se há algum valor no state alternatives */}
					{alternatives && alternatives.length > 0 ? (
						<>
							<label htmlFor='alternatives'>Alternativas</label>
							<ul id='alternatives'>
								{/* caso sim, faz um map, renderizando todas as alternativas */}
								{alternatives.map((alternative) => {
									return (
										<li key={alternative._id}>
											<InputContainer
												style={{
													flexDirection: 'row',
												}}
											>
												<div className='alternative__letter-container'>
													<Input
														value={alternative.letter}
														style={{
															textAlign: 'center',
															padding: '6px',
														}}
														onChange={(e) => setAlternative(e, alternative._id, 'letter')}
													/>
												</div>
												<div className='alternative__text-container'>
													<Input
														value={alternative.text}
														minLength={1}
														maxLength={500}
														onChange={(e) => setAlternative(e, alternative._id, 'text')}
													/>
												</div>
											</InputContainer>
											<div className='alternavite__options'>
												<Checkbox
													label='Correta'
													checked={
														// verifica se o id da alternativa é igual ao valor do state checked
														alternative._id ===
														checked
													}
													checkHandle={
														(e) =>
															checkHandle(
																e as ChangeEvent<HTMLInputElement>,
																alternative._id
															)
													}
												/>
												<Button
													onClick={() =>
														removeAlternative(
															alternative._id,
														)
													}
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
							</ul>
						</>
					) : (
						<p className='empty-alternatives'>
							Cadastre ao menos duas alternativas
						</p>
					)}
					{
						// só exibira o button de adicionar alternativa até a quinta alternativa
						alternatives && alternatives.length < 5 &&
							<Button className='add-alternative' onClick={() => addAlternative()}>
								<Plus />
								Alternativa
							</Button>
					}
				</AlternativesDiv>
				<ModalButtonsDiv mode={mode} />
			</Form>
		</Modal>
	)
}

export default QuestionForm
