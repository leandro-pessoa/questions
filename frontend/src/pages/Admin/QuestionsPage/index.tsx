import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchQuestions, selectActualPage, selectFetchLimit, selectQuestions, selectQuestionsStatus, selectTotalQuestionPages } from '@/app/reducers/question'
import { useMemo, useState } from 'react'

import Crud from '@/components/Crud'

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
				'N° Alternativas'
			]}
			localLoading={loading}
			data={questions || []}
			dataStatus={questionsStatus}
			fetchFunc={fetchQuestions}
			actualPage={questionsActualPage}
			limit={questionsLimit}
			totalPages={questionsTotalPages}
		/>
	)
}

export default QuestionsPage
