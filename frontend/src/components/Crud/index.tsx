import { selectIsLoading } from '@/app/reducers/loading'
import { useAppSelector } from '@/app/hooks'
import { vars } from '@/styles/vars'

import Button from '../Button'
import { StyledDiv } from './styles'
import { Trash2, Pencil } from 'lucide-react'
import { Title } from '../Title'
import { Loading } from '../Loading'

interface CrudProps {
	data: { _id: string }[]
	labels: string[]
	localLoading: boolean
}

const Crud = ({ data, labels, localLoading }: CrudProps) => {
	const globalLoading = useAppSelector(selectIsLoading)

	return (
		// enquanto o loading padrão da página admin estiver ativo, não irá exibir a tabela
		// o local loading irá definir o display do loading da tabela (e não da página)
		!globalLoading && localLoading ? (
			<Loading>
				<div></div>
			</Loading>
		) : data.length === 0 ? (
			<Title style={{ borderBottom: `2px solid ${vars.colors.blue}` }}>
				Nenhum dado foi encontrado
			</Title>
		) : (
			<StyledDiv>
				<table>
					<thead>
						<tr>
							<th>Ações</th>
							{/* titulos da tabela, com base na prop labels */}
							{labels.map((value: string) => {
								return <th>{value}</th>
							})}
						</tr>
					</thead>
					<tbody>
						{/* irá exibir os dados obtidos do server */}
						{data.map((value) => {
							// transforma o objeto em um array em que cada elemento é um array contendo o par chave/valor (ex: [['nome', 'leandro']])
							const entries = Object.entries(value)
							return (
								<tr key={value._id}>
									<td
										style={{
											display: 'flex',
											gap: '4px',
											borderBottom: 'none',
										}}
									>
										<Button iconButton>
											<Pencil />
										</Button>
										<Button iconButton>
											<Trash2 />
										</Button>
									</td>
									{entries.map((entry, index) => {
										// caso o valor seja um array, retorna a length dele
										// caso não, retorna o valor
										const isArray = Array.isArray(entry[1])
											? entry[1].length
											: entry[1]
										return (
											<td
												key={index}
												title={String(isArray)}
											>
												{isArray}
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</StyledDiv>
		)
	)
}

export default Crud
