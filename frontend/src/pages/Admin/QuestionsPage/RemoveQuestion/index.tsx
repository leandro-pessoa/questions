import { useAppSelector } from '@/app/hooks'
import { selectModalType } from '@/app/reducers/modal'
import { fetchQuestions } from '@/app/reducers/question'
import { useFetch } from '@/app/hooks/useFetch'

import Modal from '@/components/Modal'
import Button from '@/components/Button'

import type { IQuestion } from '@/types/IQuestion'

const RemoveQuestion = ({ _id, subject, year }: Partial<IQuestion>) => {
	const modalType = useAppSelector(selectModalType)

	const { fetchHandle } = useFetch()

	return modalType === 'removeQuestion' ? (
		<Modal
			title='Remover questão'
			closeElement='Não'
			execButton={
				// realiza a requisição de remoção de uma questão
				<Button
					onClick={() =>
						fetchHandle<IQuestion>({
							url: `/questions/${_id}`,
							httpMethod: 'delete',
							refreshFunc: fetchQuestions, // faz o fetch das questões atualizadas
							globalLoading: true,
							feedbackText: `Questão ${_id} removida com sucesso`,
							isModal: true,
						})
					}
				>
					Sim
				</Button>
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
