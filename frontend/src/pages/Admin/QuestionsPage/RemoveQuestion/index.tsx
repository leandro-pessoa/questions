import { useAppSelector } from '@/app/hooks'
import { selectModalType } from '@/app/reducers/modal'
import { fetchQuestions } from '@/app/reducers/question'

import FetchButton from '@/components/FetchButton'
import Modal from '@/components/Modal'

import type { IQuestion } from '@/types/IQuestion'

const RemoveQuestion = ({ _id, subject, year }: Partial<IQuestion>) => {
	const modalType = useAppSelector(selectModalType)

	return modalType === 'removeQuestion' ? (
		<Modal
			title='Remover questão'
			closeElement='Não'
			execButton={
				<FetchButton
					isModal
					httpMethod='delete'
					url={`/questions/${_id}`}
					refreshFunc={fetchQuestions}
					feedbackText={`Questão ${_id} removida com sucesso`}
				>
					Sim
				</FetchButton>
			}
		>
			Tem certeza que deseja excluir a questão do ano de {year},
			disciplina {subject} e id {_id} ?
		</Modal>
	) : (
		<></>
	)
}

export default RemoveQuestion
