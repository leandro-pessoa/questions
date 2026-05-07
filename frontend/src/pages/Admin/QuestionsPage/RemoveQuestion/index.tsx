import type { IQuestion } from '@/types/IQuestion'

const RemoveQuestion = ({ _id, subject, year }: Partial<IQuestion>) => {
	return (
		<div>
			Tem certeza que deseja excluir a questão do ano de {year},
			disciplina {subject} e id {_id} ?
		</div>
	)
}

export default RemoveQuestion
