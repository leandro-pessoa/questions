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

	const token = useAppSelector(selectToken)
	const [userAnsweredQuestions, setUserAnsweredQuestions] =
		useState<IUserAnsweredQuestions>({
			answeredQuestions: [],
			correct: 0,
			incorrect: 0
		})

	const [loading, setLoading] = useState<boolean>(false)

	ChartJS.register(ArcElement, Tooltip, Legend)

	useEffect(() => {
		const getUserQuestions = async () => {
			try {
				setLoading(true)
				const res = await http.get(
					'/users/getAnsweredQuestions',
					{ headers: { Authorization: token && `Bearer ${token}`}}
				)
				setUserAnsweredQuestions(res.data)
			} catch(err) {
				axiosError(err)
			}
			setLoading(false)
		}

		if (userAnsweredQuestions.answeredQuestions.length < 1) getUserQuestions()
	}, [token, dispatch, userAnsweredQuestions.answeredQuestions.length])

	console.log(userAnsweredQuestions)

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
			{
				loading ?
					<Loading $overlay={false}><div></div></Loading>
				:
					<>
						{
							userAnsweredQuestions.answeredQuestions.length < 1 ?
								<p style={{ textAlign: 'center', margin: '32px 0' }}>
									Nenhuma questão foi respondida ainda.
								</p>
							:
								<Pie data={data} />
						}
					</>
			}
		</>
	)
}

export default UserStatistics
