import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectToken } from '@/app/reducers/user'
import { http } from '@/http'
import { vars } from '@/styles/vars'
import { useEffect, useState } from 'react'
import { axiosError } from '@/utils/axiosError'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Loading } from '@/components/Loading'

import type { IAnsweredQuestion } from '@/types/IAnsweredQuestion'

type IUserAnsweredQuestions = {
	answeredQuestions: IAnsweredQuestion[],
	correct: number,
	incorrect: number
}

const UserStatistics = () => {
	const dispatch = useAppDispatch()

	// token de sessão do user
	const token = useAppSelector(selectToken)

	// questões respondidas do user (definidas pela resposta da requisição)
	const [userAnsweredQuestions, setUserAnsweredQuestions] =
		useState<IUserAnsweredQuestions>({
			answeredQuestions: [],
			correct: 0,
			incorrect: 0
		})

	// state do loading local
	const [loading, setLoading] = useState<boolean>(false)

	// configuração do chartjs
	ChartJS.register(ArcElement, Tooltip, Legend)

	useEffect(() => {
		// obtém as questões respondidas do user da API
		const getUserQuestions = async () => {
			try {
				// loading
				setLoading(true)
				// requisição, acrescentando o token de sessão do user
				const res = await http.get(
					'/users/getAnsweredQuestions',
					{ headers: { Authorization: token && `Bearer ${token}`}}
				)
				// definição do state com base na resposta
				setUserAnsweredQuestions(res.data)
			} catch(err) { // catch do error
				axiosError(err)
			}
			// loading
			setLoading(false)
		}

		// execução da função de requisição
		getUserQuestions()
	}, [token, dispatch])

	// configuração do gráfico que será exibido
	// legendas, dados e cores
	const data = {
		labels: ['Acertos', 'Erros'],
		datasets: [
			{
				label: 'Questões',
				data: [userAnsweredQuestions.correct, userAnsweredQuestions.incorrect],
				backgroundColor: [
					vars.colors.green,
					vars.colors.red
				]
			},
		],
	}

	return (
		<>
			{	// caso o state loading seja true, exibe o componente de loading
				loading ?
					<Loading $overlay={false}><div></div></Loading>
				:
					<>
						{	// caso nenhuma questão for respondida, exibe uma mensagem
							userAnsweredQuestions.answeredQuestions.length < 1 ?
								<p style={{ textAlign: 'center', margin: '32px 0' }}>
									Nenhuma questão foi respondida ainda.
								</p>
							:  	// caso exista, exibe o gráfico com as configurações
								<Pie data={data} />
						}
					</>
			}
		</>
	)
}

export default UserStatistics
