import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
	fetchQuestions,
	selectActualPage,
	selectFetchLimit,
	selectQuestions,
	selectQuestionsStatus,
	selectTotalQuestionPages,
} from '@/app/reducers/question'
import { useEffect, useState } from 'react'
import {
	selectModalData,
	setModalData,
	setModalType,
	setModalOverflow,
} from '@/app/reducers/modal'

import Crud from '@/components/Crud'
import RemoveQuestion from './RemoveQuestion'
import EditQuestion from './EditQuestion'

import type { IQuestion } from '@/types/IQuestion'

const QuestionsPage = () => {
	const dispatch = useAppDispatch()
	const questions = useAppSelector(selectQuestions)
	const questionsStatus = useAppSelector(selectQuestionsStatus)
	const questionsLimit = useAppSelector(selectFetchLimit)
	const questionsActualPage = useAppSelector(selectActualPage)
	const questionsTotalPages = useAppSelector(selectTotalQuestionPages)
	const modalData = useAppSelector(selectModalData) as IQuestion
	// state do loading local
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
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
		dispatch(setModalType('removeQuestion'))
		dispatch(setModalData({_id, subject, year}))
	}

	const openEditModal = (question: IQuestion) => {
		dispatch(setModalType('editQuestion'))
		dispatch(setModalOverflow(true))
		dispatch(setModalData({...question}))
	}

	return (
		<>
			<RemoveQuestion {...modalData} />
			<EditQuestion {...modalData}/>
			<Crud
				labels={[
					'ID',
					'Disciplina',
					'Enunciado',
					'Ano',
					'Organização',
					'Cargo',
					'Banca',
					'N° Alternativas'
				]}
				localLoading={loading}
				data={questions || []}
				dataStatus={questionsStatus}
				fetchFunc={fetchQuestions}
				actualPage={questionsActualPage}
				limit={questionsLimit}
				totalPages={questionsTotalPages}
				editFunc={openEditModal}
				removeFunc={openRemoveModal}
			/>
		</>
	)
}

export default QuestionsPage
