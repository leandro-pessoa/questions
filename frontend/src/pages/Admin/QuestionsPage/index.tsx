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
	selectModalType,
} from '@/app/reducers/modal'

import Crud from '@/components/Crud'
import RemoveQuestion from './RemoveQuestion'
import QuestionForm from './QuestionForm'

import type { IQuestion } from '@/types/IQuestion'

const QuestionsPage = () => {
	const dispatch = useAppDispatch()
	const questions = useAppSelector(selectQuestions)
	const questionsStatus = useAppSelector(selectQuestionsStatus)
	const questionsLimit = useAppSelector(selectFetchLimit)
	const questionsActualPage = useAppSelector(selectActualPage)
	const questionsTotalPages = useAppSelector(selectTotalQuestionPages)
	const modalData = useAppSelector(selectModalData) as IQuestion
	const modalType = useAppSelector(selectModalType)
	// state do loading local
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const getQuestions = () => {
			// obtém as questões
			setLoading(true)
			dispatch(fetchQuestions())
			setLoading(false)
		}
		getQuestions()
	}, [dispatch])

	const openRemoveModal = ({ _id, subject, year }: Partial<IQuestion>) => {
		dispatch(setModalType('removeQuestion'))
		dispatch(setModalData({_id, subject, year}))
	}

	const openEditModal = (question: IQuestion) => {
		dispatch(setModalType('editQuestion'))
		dispatch(setModalData({...question}))
	}

	const openAddModal = () => {
		dispatch(setModalType('addQuestion'))
	}

	return (
		<>
			<RemoveQuestion {...modalData} />
			{/* somente abre o modal de editar questões caso o tipo seja igual ao informado */}
			{modalType === 'editQuestion' && <QuestionForm question={modalData} mode='put' />}
			{/* somente abre o modal de adicionar questões caso o tipo seja igual ao informado */}
			{modalType === 'addQuestion' && <QuestionForm mode='post' />}
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
				addFunc={openAddModal}
				searchUrl='searchQuestions'
			/>
		</>
	)
}

export default QuestionsPage
