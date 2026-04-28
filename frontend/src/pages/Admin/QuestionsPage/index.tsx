import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchQuestions, selectQuestions } from '@/app/reducers/question'
import Crud from '@/components/Crud'
import { useMemo, useState } from 'react'

const QuestionsPage = () => {
	const dispatch = useAppDispatch()
	const questions = useAppSelector(selectQuestions)
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
		/>
	)
}

export default QuestionsPage
