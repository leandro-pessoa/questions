import { useAppDispatch } from '@/app/hooks'
import { vars } from '@/styles/vars'

import Button from '../Button'
import { StyledDiv } from './styles'
import { Trash2, Pencil, RotateCcw } from 'lucide-react'
import { Loading } from '../Loading'
import Input from '../Input'
import FiltersSelect from '../Filters/FiltersSelect'
import { CenterContainer } from '../CenterContainer'
import { Title } from '../Title'

import type { FetchUrl } from '@/types/FetchUrl'
import Pagination from '../Pagination'

interface CrudProps<T> {
	data: { _id: string }[]
	labels: string[]
	localLoading: boolean
	dataStatus: 'idle' | 'succeeded' | 'pending' | 'failed'
	fetchFunc: FetchUrl<T>
	totalPages: number
	actualPage: number
	limit: number
}

const Crud = <T,>({
	data,
	labels,
	dataStatus,
	fetchFunc,
	totalPages,
	actualPage,
	limit,
}: CrudProps<T>) => {
	const dispatch = useAppDispatch()

	const renderData = () => {
		switch (dataStatus) {
			case 'pending':
				return (
					<CenterContainer $height='header'>
						<Loading>
							<div></div>
						</Loading>
					</CenterContainer>
				)
			case 'succeeded':
				return data.length === 0 ? (
					<Title
						style={{
							borderBottom: `2px solid ${vars.colors.blue}`,
						}}
					>
						Nenhum dado foi encontrado
					</Title>
				) : (
					<StyledDiv>
						<div className='filters_wrapper'>
							<FiltersSelect
								title='Qtde resultados'
								defaultContent={['5', '10', '15', '20', '30']}
							/>
							<Input
								className='filters_wrapper__search_input'
								placeholder='Pesquisar'
							/>
						</div>
						<div className='responsive_table'>
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
													const isArray =
														Array.isArray(entry[1])
															? entry[1].length
															: entry[1]
													return (
														<td
															key={index}
															title={String(
																isArray,
															)}
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
						</div>
						<Pagination
							actualPage={actualPage}
							limit={limit}
							totalPages={totalPages}
							fetchFunc={fetchFunc}
							style={{padding: '0'}}
						/>
					</StyledDiv>
				)
			case 'failed':
				return (
					<CenterContainer $height='header'>
						<h2>Falha ao tentar carregar os dados</h2>
						<br />
						<Button onClick={() => dispatch(fetchFunc())}>
							<RotateCcw />
							Recarregar
						</Button>
					</CenterContainer>
				)
		}
	}

	return renderData()
}

export default Crud
