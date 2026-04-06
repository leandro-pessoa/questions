import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectToken } from '@/app/reducers/user'
import { http } from '@/http'
import { vars } from '@/styles/vars'
import { useEffect, useState } from 'react'
import { axiosError } from '@/utils/axiosError'

import { Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'
import { Loading } from '@/components/Loading'

import type { IAnsweredQuestion } from '@/types/IAnsweredQuestion'

type IUserAnsweredQuestions = {
	answeredQuestions: IAnsweredQuestion[],
	correct: number,
	incorrect: number
	weeklyAnsweredQuestions: number[]
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
			incorrect: 0,
			weeklyAnsweredQuestions: []
		})

	// state do loading local
	const [loading, setLoading] = useState<boolean>(false)

	// configuração do chartjs
	ChartJS.register(
		ArcElement,
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	)

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
	const pieData = {
		labels: ['Acertos', 'Erros'],
		datasets: [
			{
				label: 'Questões',
				data: [userAnsweredQuestions.correct, userAnsweredQuestions.incorrect],
				backgroundColor: [
					`${vars.colors.green}88`,
					`${vars.colors.red}88`
				],
				borderColor: [
					vars.colors.green,
					vars.colors.red
				],
				borderWidth: 2
			},
		],
	}

	// um dia em milisegundos para facilitar o cálculo dos dias
	const dayInMilliseconds = 86400000

	// constantes para datas
	const date = new Date()
	const time = date.getTime() // data atual em milisegundos

	// irá obter a data do dia atual e dos 6 anteriores em milisegundos
	const recentDays = [
		time - dayInMilliseconds * 6,
		time - dayInMilliseconds * 5,
		time - dayInMilliseconds * 4,
		time - dayInMilliseconds * 3,
		time - dayInMilliseconds * 2,
		time - dayInMilliseconds,
		time,
	]

	// legendas dos dias da semana em português
	const weekDaysLabels = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

	// irá retornar um array com o dia atual e os 6 anteriores com a legenda correta
	const weekDays = recentDays.map((day) => {
		return weekDaysLabels[new Date(day).getDay()]
	})

	// dados do gráfico em linha
	const lineData = {
		labels: [...weekDays],
		datasets: [
			{
				label: 'Questões respondidas',
				data: userAnsweredQuestions.weeklyAnsweredQuestions,
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	}

	// configurações do gráfico em linha
	const lineOptions = {
		elements: {
			point: { // define o tamanho da área de interação dos pontos do gráfico
				hitRadius: 100
			}
		},
		scales: {
			y: {
				beginAtZero: true, // o início do y deve começar no 0
				ticks: {
					// remove os números que não são inteiros do y
					callback: function(val: number | string) {
						return Number.isInteger(val) ? val : ''
					}
				}
			}
		}
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
								<>
									<Pie data={pieData} />
									<Line data={lineData} options={lineOptions} />
								</>
						}
					</>
			}
		</>
	)
}

export default UserStatistics
