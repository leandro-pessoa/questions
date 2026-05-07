import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
	fetchQuestions,
	selectActualPage,
	selectFetchLimit,
	selectQuestions,
	selectQuestionsStatus,
	selectTotalQuestionPages,
} from '@/app/reducers/question'
import { useMemo, useState } from 'react'
import { setModal, setModalDisplay } from '@/app/reducers/modal'

import Crud from '@/components/Crud'
import type { IQuestion } from '@/types/IQuestion'
import FetchButton from '@/components/FetchButton'
import RemoveQuestion from './RemoveQuestion'

const QuestionsPage = () => {
	const dispatch = useAppDispatch()
	const questions = useAppSelector(selectQuestions)
	const questionsStatus = useAppSelector(selectQuestionsStatus)
	const questionsLimit = useAppSelector(selectFetchLimit)
	const questionsActualPage = useAppSelector(selectActualPage)
	const questionsTotalPages = useAppSelector(selectTotalQuestionPages)
	// state do loading local
	const [loading, setLoading] = useState<boolean>(false)

	useMemo(() => {
		const getQuestions = () => {
			// obtém as questões, caso não estejam no state global
			if (!questions || questions.length === 0) {
				setLoading(true)
				dispatch(fetchQuestions())
				setLoading(false)
			}
		}
		getQuestions()
	}, [questions, dispatch])

	const openRemoveModal = ({ _id, subject, year }: Partial<IQuestion>) => {
		dispatch(setModalDisplay(true))
		dispatch(
			setModal({
				modalChildren: (
					<RemoveQuestion _id={_id} subject={subject} year={year} />
				),
				modalCloseElement: 'Não',
				modalExecButton: (
					<FetchButton
						isModal
						httpMethod='delete'
						url={`/questions/${_id}`}
						refreshFunc={fetchQuestions}
						feedbackText={`Questão ${_id} removida com sucesso`}
					>
						Sim
					</FetchButton>
				),

				modalTitle: 'Remover questão',
			}),
		)
	}

	return (
		<Crud
			labels={[
				'ID',
				'Disciplina',
				'Enunciado',
				'Ano',
				'Organização',
				'Cargo',
				'Banca',
				'N° Alternativas',
			]}
			localLoading={loading}
			data={questions || []}
			dataStatus={questionsStatus}
			fetchFunc={fetchQuestions}
			actualPage={questionsActualPage}
			limit={questionsLimit}
			totalPages={questionsTotalPages}
			editFunc={() => {}}
			removeFunc={openRemoveModal}
		/>
	)
}

export default QuestionsPage
