import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchQuestions, selectQuestions } from '@/app/reducers/question'
import Crud from '@/components/Crud'
import { useMemo } from 'react'

const QuestionsPage = () => {
	const dispatch = useAppDispatch()
	const questions = useAppSelector(selectQuestions)

	useMemo(() => {
		// obtém as questões, caso não estejam no state global
		if (!questions || questions.length === 0) {
			dispatch(fetchQuestions())
		}
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
			data={questions || []}
		/>
	)
}

export default QuestionsPage
